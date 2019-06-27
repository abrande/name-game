import React from "react";
import "./timer.css";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRemainingInSeconds: this.props.timerAmountSelected
        };
    }

    componentDidMount() {
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
                                animation: `countdown-animation ${this.state.timerAmountSelected}ss linear`
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