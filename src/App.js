import React from 'react';
import EmployeeLineup from "./EmployeeLineup/EmployeeLineup";
import GameContainer from "./TimerGame/GameContainer";
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
        this.addGamePoint = this.addGamePoint.bind(this);
        this.removeGamePoint = this.removeGamePoint.bind(this);
        this.gameStarted = this.gameStarted.bind(this);
        this.mattOptionSelected = this.mattOptionSelected.bind(this);

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

    addGamePoint() {
        let guess = this.state.correctGuesses + 1;
        this.setState({correctGuesses: guess});
    }

    removeGamePoint() {
        let guess = this.state.incorrectGuesses + 1;
        this.setState({incorrectGuesses: guess});
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
                        addPoint={this.addGamePoint}
                        removePoint={this.removeGamePoint}
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
                {this.renderLineup()}
                <GameContainer
                    correctGuesses={this.state.correctGuesses}
                    incorrectGuesses={this.state.incorrectGuesses}
                    startKeepingScore={this.gameStarted}
                    mattGameSelected={this.mattOptionSelected}
                />
            </div>
        )
    }
}

export default App;