import React from "react"
import {Jumbotron, Container, Row, Col} from "react-bootstrap";
import {getRandomSelection, getRandomInt} from "../utils/randomHelpers";
import EmployeeCards from "./EmployeeCards";
import "./lineup.css";

class EmployeeLineup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            selectedEmployees: [],
            employeeToGuess: "",
            indexToGuess:  null,
            activeIndex: null
        };
        this.checkMatch = this.checkMatch.bind(this);
    }

    componentDidMount() {
        this.getSelections();
    }

    getSelections() {
        let selected = getRandomSelection(this.props.employees, 5);
        let choice = getRandomInt(6);
        this.setState({employeeList: selected, employeeToGuess: selected[choice], indexToGuess: choice});
    }


    checkMatch(id) {
        let list = this.state.selectedEmployees;
        list.push(id);
        this.setState({selectedEmployees: list, activeIndex: id});
        return id === this.state.indexToGuess;
    }

    createCards() {
        return this.state.employeeList.map((employee, index) => {
            return (
                <Col xs={6} md={2} key={index}>
                    <EmployeeCards
                        index={index}
                        employee={employee}
                        checkMatch={this.checkMatch}
                        isActive={index === this.state.activeIndex}
                    />
                </Col>
            )
        });
    }

    render() {
        return (
            <Jumbotron fluid>
                <h1>Who is {this.state.employeeToGuess.firstName} {this.state.employeeToGuess.lastName}?</h1>
                <div className="lineup-container">
                    <Container fluid>
                        <Row>
                            <Col md={1}/>
                            {this.createCards()}
                        </Row>
                    </Container>
                </div>
            </Jumbotron>
        )
    }
}

export default EmployeeLineup;