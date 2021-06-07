import {useEffect, useState} from 'react'
import {interval, Subject} from 'rxjs'
import {takeUntil} from 'rxjs/operators'
import {getClickTime, getStopwatchTime} from './utils'

const App = () => {

    const [clickHistory, setClickHistory] = useState([])
    const [count, setCount] = useState(0)
    const [isOn, setIsOn] = useState(false)

    const handleCLick = () => {
        setIsOn(!isOn)
        !isOn || setCount(0)
    }

    const handleWait = e => {
        clickHistory.push(Math.floor(e.timeStamp))
        if (clickHistory.length > 1 && getClickTime(clickHistory) < 300) {
            isOn && setIsOn(!isOn)
            setClickHistory([])
        }
    }

    useEffect(() => {

        const unsubscribe$ = new Subject()

        interval(100)
            .pipe(
                takeUntil(unsubscribe$)
            )
            .subscribe(() => {
                if (isOn) {
                    setCount(v => v + 1)
                }
            })

        return () => {
            unsubscribe$.next()
            unsubscribe$.complete()
        }
    }, [isOn])

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mt-5 text-center">
                    <h1>{getStopwatchTime(count)}</h1>
                </div>
                <div className="cok-12 text-center">
                    <button className='btn btn-primary me-2'
                            style={{width: '78px'}}
                            onClick={handleCLick}
                    >
                        {!isOn ? 'START' : 'STOP'}
                    </button>
                    <button className='btn btn-danger me-2' onClick={() => setCount(0)}>RESET</button>
                    <button className='btn btn-warning' onClick={handleWait}>WAIT</button>
                </div>
            </div>
        </div>
    )
}

export default App