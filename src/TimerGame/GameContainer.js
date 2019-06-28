import React from "react";
import {Button, Modal, Form, Container, Col, Alert, Row} from "react-bootstrap";
import GameStats from "./GameStats";
import Timer from "./Timer";
import {getFinalScore} from "../utils/gameScoreHelper";
import "./timer-game.css";

class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            gameLevel: 1,
            beginNewGame: false,
            mattBoxSelected: false,
            timerAmountSelected: 0,
            timerFinished: false,
            finishedTime: 0,
            gameWon: false,
            totalScore: 0,
            showResults: "hide"
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.startGame = this.startGame.bind(this);
        this.setMattChallenge = this.setMattChallenge.bind(this);
        this.setTimerFinished = this.setTimerFinished.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.beginNewGame) {
            if (nextProps.correctGuesses !== this.props.correctGuesses || nextProps.incorrectGuesses !== this.props.incorrectGuesses) {
                let total = getFinalScore(this.state.gameLevel, this.props.correctGuesses, this.props.incorrectGuesses);
                this.setState({totalScore: total});
            }
        }
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true, timerAmountSelected: 0, beginNewGame: false});
    }

    setRules(level) {
        this.setState({gameLevel: level});
    }

    startGame() {
        this.props.startKeepingScore(true);
        this.setState({
            beginNewGame: true,
            show: false,
            timerFinished: false,
            gameWon: false,
            finishedTime: 0,
            showResults: "hide",
            gameTotalResults: 0
        });
    }

    setTime (time) {
        this.setState({timerAmountSelected: time});
    }

    setMattChallenge() {
        this.props.mattGameSelected(!this.state.mattBoxSelected);
        this.setState({mattBoxSelected: !this.state.mattBoxSelected});
    }

    setTimerFinished (finishedTime) {
        this.setState({timerFinished: true, finishedTime: finishedTime, showResults: "show"});
        this.gameWon();
    }

    gameWon() {
        if (this.state.totalScore > 5) {
            this.setState({gameWon: true})
        }
        else {
            this.setState({gameWon: false})

        }
    }

    returnFinalScore () {
        if (this.state.timerFinished && this.state.gameWon) {
            return (
                <Alert variant="success" className={this.state.showResults}>You won the game with {this.state.totalScore} points! </Alert>
            )
        }
        else if (this.state.timerFinished && this.state.timerAmountSelected && !this.state.gameWon && !this.state.show) {
            return (
                <Alert variant="danger" className={this.state.showResults}>No win this time, but I believe in you!</Alert>
            )
        }
        else {
            return null;
        }
    }

    returnGameStatsSection() {
        if (this.state.beginNewGame) {
            if (this.state.timerAmountSelected) {
                return (
                    <div>
                        <p>Get to 100 points before the timer runs out!</p>
                        <Row>
                            <Col md={12}>
                                <Timer
                                    timerAmountSelected={this.state.timerAmountSelected}
                                    timerFinished={this.setTimerFinished}
                                    timerStopped={this.state.timerFinished}
                                    beginNewGame={this.state.beginNewGame}
                                    modalIsVisible={this.state.show}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <GameStats
                                correctGuesses={this.props.correctGuesses}
                                incorrectGuesses={this.props.incorrectGuesses}
                                totalScore={this.state.totalScore}
                                timerAmountSelected={this.state.timerAmountSelected}
                            />
                        </Row>
                    </div>
                )
            } else {
                return (
                    <Row>
                        <GameStats
                            correctGuesses={this.props.correctGuesses}
                            incorrectGuesses={this.props.incorrectGuesses}
                            totalScore={this.state.totalScore}
                            timerAmountSelected={this.state.timerAmountSelected}
                        />
                    </Row>
                )
            }
        }
    }

    render() {
        return (
            <div className="game-container">
                <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        Challenge Options
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Alert variant="warning" className="note-to-user">Note: If no timer is selected you will only see how many correct guesses you have</Alert>
                            <p>Choose level of difficulty</p>
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <Alert variant={"primary"} className="level-selection-alert">
                                            <Form.Check
                                                type="radio"
                                                label="I'm kind of bad with names."
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                                className="challenge-text"
                                                onChange={this.setRules.bind(this, 1)}
                                                checked={this.state.gameLevel === 1}
                                            />
                                        </Alert>
                                    </Col>
                                    <Col md={12}>
                                        <Alert variant={"success"} className="level-selection-alert">
                                            <Form.Check
                                                type="radio"
                                                label="I know some things."
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                                className="challenge-text"
                                                onChange={this.setRules.bind(this, 2)}
                                                checked={this.state.gameLevel === 2}

                                            />
                                        </Alert>
                                    </Col>
                                    <Col md={12}>
                                        <Alert variant={"warning"} className="level-selection-alert">
                                            <Form.Check
                                                type="radio"
                                                label="You obviously don't know what 'hard' means."
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                                className="challenge-text"
                                                onChange={this.setRules.bind(this, 3)}
                                                checked={this.state.gameLevel === 3}

                                            />
                                        </Alert>
                                    </Col>
                                    <Col md={12}>
                                        <Alert variant={"danger"} className="level-selection-alert">
                                            <Form.Check
                                                type="radio"
                                                label="I laugh in the face of danger."
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                                className="challenge-text"
                                                onChange={this.setRules.bind(this, 4)}
                                                checked={this.state.gameLevel === 4}
                                            />
                                        </Alert>
                                    </Col>
                                </Row>
                            </Form>
                            <hr/>
                            <p>How much time do you want?</p>
                            <Form.Check
                                type="radio"
                                label="30 seconds"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                className="challenge-text"
                                onChange={this.setTime.bind(this, 30)}
                                checked={this.state.timerAmountSelected === 30}

                            />
                            <Form.Check
                                type="radio"
                                label="1 minute"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                className="challenge-text"
                                onChange={this.setTime.bind(this, 60)}
                                checked={this.state.timerAmountSelected === 60}

                            />
                            <Form.Check
                                type="radio"
                                label="No timer"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                className="challenge-text"
                                onChange={this.setTime.bind(this, 0)}
                                checked={!this.state.timerAmountSelected}
                            />
                            <hr/>
                            <p>Extra</p>
                            <Form.Check
                                type="checkbox"
                                label="The 'Matt' Challenge"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                className="challenge-text"
                                onChange={this.setMattChallenge}
                                checked={this.state.mattBoxSelected}
                            />
                            <div className="modal-button-container">
                                <Button variant="primary" size="sm" onClick={this.startGame}> Submit </Button>
                            </div>
                        </Container>
                    </Modal.Body>
                </Modal>
                {this.returnFinalScore()}
                {this.returnGameStatsSection()}
                <Button variant="primary" onClick={this.handleShow}> Want a Challenge? </Button>
            </div>
        )
    }
}

export default GameContainer;