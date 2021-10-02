// Write your code here
import {Component} from 'react'
import './index.css'

const playBtn = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseBtn = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

class DigitalTimer extends Component {
  state = {isTimerStart: false, setTimerLimit: 25, min: 25, seconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.timerID)

  onIncrementSetTimer = () => {
    this.setState(prevState => ({
      setTimerLimit: prevState.setTimerLimit + 1,
      min: prevState.min + 1,
    }))
  }

  onDecrementSetTimer = () => {
    const {setTimerLimit} = this.state
    if (setTimerLimit > 0) {
      this.setState(prevState => ({
        setTimerLimit: prevState.setTimerLimit - 1,
        min: prevState.min - 1,
      }))
    }
  }

  onClickResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerStart: false,
      min: 25,
      seconds: 0,
      setTimerLimit: 25,
    })
  }

  timerFunction = () => {
    const {seconds, min} = this.state
    if (seconds > 0) {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
    if (seconds === 0) {
      if (min === 0) {
        clearInterval(this.timerID)
        this.setState({isTimerStart: false})
      } else {
        this.setState(prevState => ({
          min: prevState.min - 1,
          seconds: 59,
        }))
      }
    }
  }

  onClickStartTimer = () => {
    const {isTimerStart} = this.state
    if (isTimerStart) {
      this.clearTimerInterval()
    } else {
      this.timerID = setInterval(this.timerFunction, 1000)
    }
    this.setState(prevState => ({isTimerStart: !prevState.isTimerStart}))
  }

  render() {
    const {setTimerLimit, isTimerStart, seconds, min} = this.state
    const timerStatus = isTimerStart ? 'Running' : 'Paused'
    const playOrPauseButton = isTimerStart ? pauseBtn : playBtn
    const startOrPauseText = isTimerStart ? 'Pause' : 'Start'
    const btnAltText = isTimerStart ? 'pause icon' : 'play icon'
    const isButtonDisabled = seconds > 0 && isTimerStart === true
    return (
      <div className="timer-app-bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-bg-container">
            <div className="timer">
              <h1 className="timer-value">
                {min < 10 ? `0${min}` : min}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="right-side-container">
            <div className="start-reset-container">
              <button
                type="button"
                className="button"
                onClick={this.onClickStartTimer}
              >
                <img
                  src={playOrPauseButton}
                  alt={btnAltText}
                  className="image"
                />
              </button>
              <p className="control-text">{startOrPauseText}</p>
              <button
                type="button"
                className="button"
                onClick={this.onClickResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="image"
                />
              </button>
              <span className="control-text">Reset</span>
            </div>
            <p className="set-limit-text">Set timer limit</p>
            <div className="set-limit-container">
              <button
                disabled={isButtonDisabled}
                type="button"
                className="set-limit-button"
                onClick={this.onIncrementSetTimer}
              >
                +
              </button>
              <div className="limit">
                <p>{setTimerLimit}</p>
              </div>
              <button
                disabled={isButtonDisabled}
                type="button"
                className="set-limit-button"
                onClick={this.onDecrementSetTimer}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
