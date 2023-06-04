const timeFilter = (time: string) => {
    const Time = new Date(time).getTime();
    const nowTime = Date.now();
    const TimeDifference = (nowTime - Time) / 1000;
    if (TimeDifference < 60) {
        return Math.floor(TimeDifference) + '秒前'
    } else if (TimeDifference < 60 * 60) {
        return Math.floor(TimeDifference / 60) + '分前'
    } else if (TimeDifference < 3600 * 24) {
        return Math.floor(TimeDifference / 3600) + '时前'
    } else {
        return time
    }
}

export default {
    timeFilter
}