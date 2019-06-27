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
                    <Col md={{span: 2, offset: 3}} xs={{span: 2, offset: 3}}>
                        <p>Correct: {this.props.correctGuesses}</p>
                    </Col>
                    <Col md={2} xs={2}>
                        <p>Incorrect: {this.props.incorrectGuesses}</p>
                    </Col>
                    <Col md={2} xs={2}>
                        <p>Total Score: {this.calculateTotal()}</p>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GameStats;