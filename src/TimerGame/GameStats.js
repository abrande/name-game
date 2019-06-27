import React from "react";
import {Col, Row} from "react-bootstrap";

class GameStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correctScoreOffset: 0,
            incorrectScoreOffset: 0
        }
    }

    componentDidMount() {
        this.handleScore();
    }

    handleScore () {
        switch (this.props.gameLevel) {
            case 1:
                this.handleEasy();
                break;
            case 2:
                this.handleMedium();
                break;
            case 3:
                this.handleHard();
                break;
            case 4:
                this.handleDanger();
                break;
            default:
                break;

        }
    }

    handleEasy() {
        this.setState({correctScoreOffset: 30, incorrectScoreOffset: 5})
    }

    handleMedium() {
        this.setState({correctScoreOffset: 50, incorrectScoreOffset: 50})
    }

    handleHard() {
        this.setState({correctScoreOffset: 70, incorrectScoreOffset: 100})
    }

    handleDanger() {
        this.setState({correctScoreOffset: 90, incorrectScoreOffset: 1000})
    }

    calculateTotal() {
        return (this.props.correctGuesses * this.state.correctScoreOffset) - (this.props.incorrectGuesses * this.state.incorrectScoreOffset);
    }

    render() {
        return (
            <div className="stats-container">
                <Row>
                    <Col md={3} xs={6}>
                        Correct: {this.props.correctGuesses}
                    </Col>
                    <Col md={3} xs={6}>
                        Incorrect: {this.props.incorrectGuesses}
                    </Col>
                    <Col md={3} xs={6}>
                        Total Score: {this.calculateTotal()}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GameStats;