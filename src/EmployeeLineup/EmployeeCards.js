import React from "react";
import {Card} from "react-bootstrap";

class EmployeeCards extends React.Component {
    returnResults(index) {
        this.props.checkMatch(index, this.props.isMatch);
    }

    returnOverlay(employee) {
        if (this.props.selected) {
            if (this.props.isMatch) {
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
            <Card className="bg-dark text-white employee-thumbnail-card" onClick={() => this.returnResults(index)}>
                <Card.Img src={employee.headshot.url} alt={employee.headshot.alt} thumbnail="true"
                          className="employee-thumbnail"/>
                {this.returnOverlay(employee)}
            </Card>
        )
    }
}

export default EmployeeCards;