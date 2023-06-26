interface Socket {
    websock: WebSocket | null;
    ws_url: string;
    socket_open: boolean;
    hearbeat_timer: ReturnType<typeof setInterval> | null;
    hearbeat_interval: number;
    is_reonnect: boolean;
    reconnect_count: number;
    reconnect_current: number;
    reconnect_timer: ReturnType<typeof setTimeout> | null;
    reconnect_interval: number;

    init(): void;
    send(data: any, callback?: () => void): void;
    receive(message: MessageEvent): void;
    heartbeat(): void;
    close(): void;
    reconnect(): void;
    registerCallBack(socketType: string, callBack: Function): void;
    unRegisterCallBack(socketType: string): void;
    callBackMapping: { [socketType: string]: Function }
}

const socket: Socket = {
    websock: null,
    ws_url: import.meta.env.VITE_WEBSOCKET_URL,
    socket_open: false,
    hearbeat_timer: null,
    hearbeat_interval: 5000,
    is_reonnect: true,
    reconnect_count: 3,
    reconnect_current: 1,
    reconnect_timer: null,
    reconnect_interval: 3000,
    callBackMapping: {},

    init(): void {
        if (!("WebSocket" in window)) {
            console.log('浏览器不支持WebSocket');
            return;
        }

        // 如果 WebSocket 实例已经存在并且处于打开状态，则不需要重新初始化
        if (this.websock && this.websock.readyState === WebSocket.OPEN) {
            return;
        }

        // 如果 WebSocket 实例已经存在但处于关闭状态，则需要先将其关闭
        if (this.websock && this.websock.readyState === WebSocket.CLOSED) {
            this.websock = null;
        }

        this.websock = new WebSocket(this.ws_url);

        this.websock.onmessage = (e) => {
            this.receive(e);
        };

        this.websock.onclose = (e) => {
            console.log('连接已断开');
            console.log('connection closed (' + e.code + ')');
            clearInterval(this.hearbeat_interval);
            this.socket_open = false;

            if (this.is_reonnect) {
                this.reconnect_timer = setTimeout(() => {
                    if (this.reconnect_current > this.reconnect_count) {
                        clearTimeout(this.reconnect_timer!);
                        return;
                    }
                    this.reconnect_current++;
                    this.reconnect();
                }, this.reconnect_interval);
            }
        };

        this.websock.onopen = () => {
            console.log('连接成功');
            this.socket_open = true;
            this.is_reonnect = true;
            this.heartbeat();
        };

        this.websock.onerror = () => {
            console.log('WebSocket连接发生错误');
        };
    },

    send(data: any, callback: (() => void) | undefined = undefined): void {
        if (this.websock && this.websock.readyState === this.websock.OPEN) {
            
            this.websock.send(JSON.stringify(data));
            if (callback) {
                callback();
            }
        } else if (this.websock && this.websock.readyState === this.websock.CONNECTING) {
            setTimeout(() => {
                this.send(data, callback);
            }, 1000);
        } else {
            this.init();
            setTimeout(() => {
                this.send(data, callback);
            }, 1000);
        }
    },
    // 处理接受到的信息
    receive(message: MessageEvent): void {
        const params = JSON.parse(message.data);
        if (params.event!='pink') {
            // 排除掉心跳检测
            if (this.callBackMapping && this.callBackMapping[params.callback]) {
                this.callBackMapping[params.callback](params)
            }
        }
    },

    heartbeat(): void {
        console.log('socket', 'ping');

        if (this.hearbeat_timer) {
            clearInterval(this.hearbeat_timer);
        }

        this.hearbeat_timer = setInterval(() => {
            const data = {
                event: 'heartbeat',
            };

            this.send(data);
        }, this.hearbeat_interval);
    },

    close(): void {
        console.log('主动断开连接');
        clearInterval(this.hearbeat_interval);
        this.is_reonnect = false;
        this.websock?.close();
    },

    reconnect(): void {
        console.log('发起重新连接', this.reconnect_current);

        if (this.websock && this.socket_open) {
            this.websock.close();
        }

        this.init();
    },

    // 回调函数的注册
    registerCallBack(socketType: string, callBack: Function): void {
        this.callBackMapping[socketType] = callBack;
    },

    // 取消某一个回调函数
    unRegisterCallBack(socketType: string): void {
        this.callBackMapping[socketType] = function () { };
    },
};

export { socket }