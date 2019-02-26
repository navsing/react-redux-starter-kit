import React from 'react';
import {Button} from 'react-mdl';
import PropTypes from 'prop-types';

//Using the props I am sending from the parent here
const propTypes = {
    onButtonClickHandler: PropTypes.func.isRequired,
    taskName: PropTypes.func.isRequired
};

class ButtonReference extends React.Component {
    //This is the handler for the button click event on Child.
    onButtonClickHandler = (newVal) => {
        //This would call the click button handler on the Parent. 
        this.props.onButtonClickHandler(newVal);
    };
    render = () => {
        let task = this.props.taskName;
        return (
            <Button onClick={this.onButtonClickHandler.bind(this, task)}>
            {this.props.label}
            </Button>
        );
    };
}

export default ButtonReference;