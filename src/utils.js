export const getClickTime = history => history[history.length - 1] - history[history.length - 2]
export const getStopwatchTime = count => {

    const getHours = count => {
        const hours = Math.floor(count / 360)
        return hours < 10 ? '0' + hours : hours
    }

    const getMinutes = count => {
        const minutes = Math.floor(count / 60) % 60
        return minutes < 10 ? '0' + minutes : minutes
    }

    const getSeconds = count => {
        const seconds = count % 60
        return seconds < 10 ? '0' + seconds : seconds
    }

    return `${getHours(count)}:${getMinutes(count)}:${getSeconds(count)}`
}
