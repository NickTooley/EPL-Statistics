import React from 'react';
import App from './App';

class Label extends React.Component{
    constructor(props){
        super(props)
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <li className="labels">
                <input type="radio" name="graph-rb" id={this.props.type +"-rb"} onClick={() => this.props.func(this.props.type)} />
                <label htmlFor={this.props.type +"-rb"}>{this.Capitalize(this.props.type)}</label>
            </li>
        )
    }
}

export default Label;