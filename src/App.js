import React from 'react';
import EmployeeLineup from "./EmployeeLineup/EmployeeLineup";
import GameContainer from "./TimerGame/GameContainer";
import {Alert} from "react-bootstrap";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            error: false,
            correctGuesses: 0,
            incorrectGuesses: 0,
            gameStarted: false,
            mattGameSelected: false
        };
        this.gameStarted = this.gameStarted.bind(this);
        this.mattOptionSelected = this.mattOptionSelected.bind(this);
        this.handlePoints = this.handlePoints.bind(this);
    }

    componentDidMount() {
        fetch('https://willowtreeapps.com/api/v1.0/profiles/')
            .then(response => response.json())
            .then(data => {
                this.filterEmployees(data);
            })
            .catch(() => this.setState({error: true}));
    }

    /* the "staff" slug is only used for WillowTree as a company
     * the headshot id specified is to ignore the WillowTree stock image */
    filterEmployees(employees) {
        let employeeList = employees.filter(employee => {
            return employee.slug !== "staff" && employee.headshot.url && employee.headshot.id !== "5ZUiD3uOByWWuaSQsayAQ6"
        });
        this.setState({employees: employeeList});
    }

    handlePoints(wasMatch) {
        if (wasMatch) {
            let correctGuess = this.state.correctGuesses + 1;
            this.setState({correctGuesses: correctGuess});
        } else {
            let incorrectGuess = this.state.incorrectGuesses + 1;
            this.setState({incorrectGuesses: incorrectGuess});
        }
    }

    gameStarted(gameStarted) {
        this.setState({startKeepingScore: gameStarted, correctGuesses: 0, incorrectGuesses: 0});
    }

    mattOptionSelected(checkboxValue) {
        this.setState({mattGameSelected: checkboxValue});
    }

    renderLineup() {
        if (this.state.employees.length) {
            return (
                <div>
                    <EmployeeLineup
                        employees={this.state.employees}
                        handlePoints={this.handlePoints}
                        startKeepingScore={this.state.startKeepingScore}
                        mattGameSelected={this.state.mattGameSelected}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="App">
                <div className="main-header-section">
                    <h1 className="main-header">WillowTree Name Game</h1>
                    <hr/>
                </div>
                {!this.state.error ?
                    <div>
                    {this.renderLineup()}
                    <GameContainer
                        correctGuesses={this.state.correctGuesses}
                        incorrectGuesses={this.state.incorrectGuesses}
                        startKeepingScore={this.gameStarted}
                        mattGameSelected={this.mattOptionSelected}
                    />
                    </div>
                    : <Alert variant="danger">We seem to be having internal issues at the moment. Apologies for the inconvenience.</Alert>}
            </div>
        )
    }
}

export default App;