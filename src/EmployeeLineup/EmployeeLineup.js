import React from "react"
import {Container, Row, Col} from "react-bootstrap";
import {getRandomSelection, getRandomInt} from "../utils/randomHelpers";
import EmployeeCards from "./EmployeeCards";
import "./lineup.css";

class EmployeeLineup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            selectedEmployees: Array(5).fill(false),
            employeeToGuess: {},
            indexToGuess:  null,
            activeIndex: null
        };
        this.checkMatch = this.checkMatch.bind(this);
    }

    componentDidMount() {
        this.getNewSelections();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mattGameSelected !== this.props.mattGameSelected) {
            this.getNewSelections();
        }
    }

    getNewSelections() {
        let selected;
        if (this.props.mattGameSelected) {
            let matts = this.props.employees.filter(employee => {
                return employee.firstName.toLowerCase().startsWith("mat");
            });
            selected = getRandomSelection(matts, 5);
        }
        else {
            selected = getRandomSelection(this.props.employees, 5);
        }
        let choice = getRandomInt(5);
        this.setState({employeeList: selected, employeeToGuess: selected[choice], indexToGuess: choice});
    }

    /* checkMatch() uses the index of the card selected and sets the value for that index to true or false
     * in selectedEmployees. This so we can keep track of individual cards when selecting. After it will
      * return whether it is a match to the asked name*/
    checkMatch(id, isMatch) {
        const wasSelected = this.state.selectedEmployees.slice();
        this.setState({
            activeIndex: id
        });
        if (wasSelected[id] === false) {
            wasSelected[id] = !wasSelected[id];
            this.setState(prevState => ({
                selectedEmployees: wasSelected
            }))
        }

        if (this.props.startKeepingScore) {
            if (isMatch) {
                this.props.handlePoints(true);
            }
            else {
                this.props.handlePoints(false);
            }
        }

        if (isMatch) {
            setTimeout(this.handleCorrectGuess.bind(this), 500);
        }
    }

    handleCorrectGuess() {
        this.setState({selectedEmployees: Array(5).fill(false)});
        this.getNewSelections();
    }

    createCards() {
        return this.state.employeeList.map((employee, index) => {
            return (
                <Col xs={6} md={2} key={index}>
                    <EmployeeCards
                        index={index}
                        employee={employee}
                        checkMatch={this.checkMatch}
                        isMatch={employee === this.state.employeeToGuess}
                        selected={this.state.selectedEmployees[index]}
                    />
                </Col>
            )
        });
    }

    render() {
        return (
            <div className="employee-lineup-container">
                <h1 className="question-header">Who is {this.state.employeeToGuess.firstName} {this.state.employeeToGuess.lastName}?</h1>
                <div className="lineup-container">
                    <Container fluid>
                        <Row>
                            <Col md={1}/>
                            {this.createCards()}
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default EmployeeLineup;