export default class SocketService {
    private static instance: SocketService | null = null;

    public static get Instance(): SocketService {
        if (!this.instance) {
            this.instance = new SocketService();
        }
        return this.instance;
    }

    // 和服务端连接的socket对象
    private ws: WebSocket | null = null;

    // 存储回调函数
    private callBackMapping: { [socketType: string]: Function } = {};

    // 标识是否连接成功
    private connected = false;

    // 记录重试的次数
    private sendRetryCount = 0;

    // 重新连接尝试的次数
    private connectRetryCount = 0;

    // 定义连接服务器的方法
    public connect(): void {
        // 连接服务器
        if (!window.WebSocket) {
            return console.log('您的浏览器不支持WebSocket');
        }

        const url = 'ws://127.0.0.1:3290/ws';
        // , 'echo-protocol'
        this.ws = new WebSocket(url);

        //连接成功的事件
        this.ws.onopen = () => {
            console.log('连接服务端成功了');
            this.connected = true;

            // 重置重新连接的次数
            this.connectRetryCount = 0;
        };

        // 1.连接服务端失败
        // 2.当连接成功之后, 服务器关闭的情况
        this.ws.onclose = () => {
            console.log('连接服务端失败');
            this.connected = false;
            this.connectRetryCount++;

            setTimeout(() => {
                this.connect();
            }, 500 * this.connectRetryCount);
        };

        // 得到服务端发送过来的数据
        this.ws.onmessage = (msg: MessageEvent) => {
            const data = JSON.parse(msg.data);//服务端得到的数据
            if (this.callBackMapping && this.callBackMapping[data.callback]) {
                this.callBackMapping[data.callback](data)
            }
        };
    }

    // 回调函数的注册
    public registerCallBack(socketType: string, callBack: Function): void {
        this.callBackMapping[socketType] = callBack;
    }

    // 取消某一个回调函数
    public unRegisterCallBack(socketType: string): void {
        this.callBackMapping[socketType] = function () { };
    }

    // 发送数据的方法
    public send(data: any): void {
        if (this.connected) {
            this.sendRetryCount = 0;
            try {
                this.ws?.send(JSON.stringify(data));
            } catch (e) {
                this.ws?.send(data);
            }
        } else {
            this.sendRetryCount++;

            setTimeout(() => {
                this.send(data);
            }, this.sendRetryCount * 500);
        }
    }
}

