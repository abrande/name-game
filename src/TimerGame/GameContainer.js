import React from "react";
import {Button, Modal, Form, Container, Col, Alert, Row} from "react-bootstrap";
import GameStats from "./GameStats";
import "./timer-game.css";
import Timer from "./Timer";

class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            gameLevel: 0,
            rulesSet: false,
            mattBoxSelected: false,
            timerAmountSelected: 0
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.startGame = this.startGame.bind(this);
        this.clearRules = this.clearRules.bind(this);
        this.setMattChallenge = this.setMattChallenge.bind(this);
    }

    setRules(level) {
        this.setState({gameLevel: level});
    }

    startGame() {
        this.props.startKeepingScore(true);
        this.setState({rulesSet: true, show: false});
    }

    clearRules() {
        this.props.startKeepingScore(false);
        this.setState({gameLevel: 0, setRules: false, show: false});
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    setTime(time) {
        this.setState({timerAmountSelected: time});
    }

    setMattChallenge() {
        this.props.mattGameSelected(!this.state.mattBoxSelected);
        this.setState({mattBoxSelected: !this.state.mattBoxSelected});
    }
    render() {
        return (
            <div className="game-container">
                <Button variant="primary" onClick={this.handleShow}> Want a Challenge? </Button>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        Challenge Options
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
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
                                <Form.Check
                                    type="checkbox"
                                    label="show stats"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                    className="challenge-text"
                                    onChange={this.startGame}
                                />
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
                                onChange={this.setTime.bind(this, -1)}
                                checked={this.state.timerAmountSelected === -1}

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
                                <Button variant="danger" size="sm" onClick={this.clearRules}> Clear Selection </Button>
                            </div>
                        </Container>
                    </Modal.Body>
                </Modal>

                {this.state.rulesSet ?
                    <div>
                        <Timer
                            timerAmountSelected={this.state.timerAmountSelected}
                        />
                        <GameStats
                            correctGuesses={this.props.correctGuesses}
                            incorrectGuesses={this.props.incorrectGuesses}
                            gameLevel={this.state.gameLevel}
                            setRules={this.state.rulesSet}
                        />
                    </div>
                    : null}

            </div>
        )
    }
}

export default GameContainer;