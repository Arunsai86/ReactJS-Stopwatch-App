import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 0,
}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 0,
    })
  }

  incrementTimeSeconds = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onPauseTimer = () => {
    clearInterval(this.intervalId)
    this.setState({isTimerRunning: false})
  }

  onStartTimer = () => {
    // console.log(isTimerRunning, timeElapsedInSeconds, timerLimitInMinutes)
    this.intervalId = setInterval(this.incrementTimeSeconds, 1000)
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 + timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    return (
      <div className="app-container">
        <div className="container">
          <h1>Stopwatch</h1>
          <div className="stopwatch-container">
            <img
              className="timer-image"
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
            />
            <p>Timer</p>
            <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
            <div className="btn-container">
              <div>
                <button
                  className="start"
                  type="button"
                  onClick={this.onStartTimer}
                >
                  Start
                </button>
              </div>
              <div>
                <button
                  className="stop"
                  type="button"
                  onClick={this.onPauseTimer}
                >
                  Stop
                </button>
              </div>
              <div>
                <button
                  className="reset"
                  type="button"
                  onClick={this.onResetTimer}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
