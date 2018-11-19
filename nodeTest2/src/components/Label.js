import React from 'react';
import App from './App';

class Label extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            pageHeader: "Default Header",
            selected: this.props.def
        };

    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    handleOnClick(){
        this.props.func(this.props.type);
        this.setState({
            selected: true
        }
        )
    }

    render() {
        if(this.props.def){
            return( 
            <li className="labels">
                <input type="radio" name="graph-rb" id={this.props.type +"-rb"} onClick={() => this.handleOnClick()} defaultChecked />
                <label htmlFor={this.props.type +"-rb"}>{this.Capitalize(this.props.type)}</label>
            </li>
            )
        }
        return (
            <li className="labels">
                <input type="radio" name="graph-rb" id={this.props.type +"-rb"} onClick={() => this.handleOnClick()} />
                <label htmlFor={this.props.type +"-rb"}>{this.Capitalize(this.props.type)}</label>
            </li>
        )
    }
}

export default Label;