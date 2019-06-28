import React from "react";
import {Col, Row} from "react-bootstrap";

const GameStats = props => {
    return (
        <div className="stats-container">
            <Row>
                <Col md={{span: 2, offset: 3}} xs={{span: 2, offset: 3}}>
                    <p>Correct: {props.correctGuesses}</p>
                </Col>
                <Col md={2} xs={2}>
                    <p>Incorrect: {props.incorrectGuesses}</p>
                </Col>
                {props.timerAmountSelected ?
                    <Col md={2} xs={2}>
                        <p>Total Score: {props.totalScore}</p>
                    </Col>
                : null}
            </Row>
        </div>
    )
};

export default GameStats;