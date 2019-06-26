import React from "react";
import {Card} from "react-bootstrap";


class EmployeeCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wasMatch: null,
            overlayClass: ''
        }
    }

    returnResults(employee) {
        let wasMatch = this.props.checkMatch(employee);
        this.setState({isActive: employee.id, wasMatch: wasMatch});
    }

    returnOverlay(employee) {
        if (this.props.isActive) {
            if (this.state.wasMatch) {
                return (
                    <Card.ImgOverlay className='card-img-overlay-success'>
                        <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
                    </Card.ImgOverlay>
                )
            } else {
                return (
                    <Card.ImgOverlay className='card-img-overlay-fail'>
                        <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
                    </Card.ImgOverlay>
                )
            }
        }
    }

    render() {
        const {employee, index} = this.props;
        return (
            <Card className={`bg-dark text-white`} onClick={() => this.returnResults(index)}>
                <Card.Img src={employee.headshot.url} alt={employee.headshot.alt} thumbnail="true"
                          className="employee-thumbnail"/>
                {this.returnOverlay(employee)}
            </Card>
        )
    }
}

export default EmployeeCards;