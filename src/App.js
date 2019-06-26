import React from 'react';
import './App.css';
import {Button} from "react-bootstrap";
import EmployeeLineup from "./EmployeeLineup/EmployeeLineup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        employees: [],
        error: false
    }
  }

  componentDidMount() {
    fetch('https://willowtreeapps.com/api/v1.0/profiles/')
        .then(response => response.json())
        .then(data => {
            this.filterEmployees(data);
        })
        .catch(() => this.setState({error: true}));
  }

  filterEmployees(employees) {
      let employeeList = employees.filter(employee => {
          return employee.slug !== "staff" && employee.headshot.url && employee.headshot.id !== "5ZUiD3uOByWWuaSQsayAQ6"
      });
      this.setState({employees: employeeList});
  }

  renderLineup() {
      if (this.state.employees.length) {
          return (
              <EmployeeLineup
                  employees={this.state.employees}
              />
          )
      }
  }


  render() {
    return (
        <div className="App">
          <h1>Willow Tree Name Game</h1>
            <Button variant="primary"> Challenge Round! </Button>
            {this.renderLineup()}
        </div>
    )
  }
}

export default App;
