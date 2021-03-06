// Tutorial for this countdown timer can be found at https://spin.atomicobject.com/2018/11/08/countdown-timer-react-typescript/
import React from "react";
import "./timer.css";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRemainingInSeconds: null
        };
    }

    componentDidMount() {
        this.startTimer()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.timerAmountSelected !== this.props.timerAmountSelected) {
            clearInterval(this.timer);
            this.startTimer();
        }
    }

    startTimer() {
        this.setState({timeRemainingInSeconds: this.props.timerAmountSelected});
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.decrementTimeRemaining();
        }, 1000);
    }

    decrementTimeRemaining = () => {
        if (this.state.timeRemainingInSeconds > 0) {
            this.setState({
                timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
            });
        } else {
            this.props.timerFinished(this.state.timeRemainingInSeconds);
            clearInterval(this.timer);
        }
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="countdown-timer">
                <div className="countdown-timer__circle">
                    <svg>
                        <circle
                            r="24"
                            cx="26"
                            cy="26"
                            style={{
                                animation: `countdown-animation ${this.props.timerAmountSelected}s linear`
                            }}
                        />
                    </svg>
                </div>
                <div className="countdown-timer__text">
                    {this.state.timeRemainingInSeconds}s
                </div>
            </div>
        );
    }
}

export default Timer;