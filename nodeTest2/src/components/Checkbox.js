import React from 'react';
import * as d3 from 'd3';

class Checkbox extends React.Component {
    constructor(props){
        super(props)
        this.state = {
             pageHeader: "Default Header",
             selected:true
            };
    }

    handleMouseOver(id){
        d3.select("#" + id + "-line").attr("z-index", 10).attr("stroke-width", 5).attr("stroke", "#e90052");
    }

    handleMouseOut(id){
        d3.select("#" + id + "-line").attr("stroke", "steelblue").attr("stroke-width", 3);
    }

    handleChange(id){
        let state = !this.state.selected;
        if(this.state.selected){
            this.setState({
                selected: state
            });
            d3.select("#"+id+"-line")
                .style("opacity", 0);
        }else{
            this.setState({
                selected: state
            });
            d3.select("#"+id+"-line")
                .style("opacity", 1);
        }
    }


    render() {
        return(
            <div className="form-checkboxes">
                <input type="checkbox" name="cb" onChange={() => this.handleChange(this.props.teamID)} id={this.props.teamID} defaultChecked/>
                <label id={this.props.teamID + "-label"} htmlFor={this.props.teamID} onMouseOver={() => this.handleMouseOver(this.props.teamID)} onMouseOut={() => this.handleMouseOut(this.props.teamID)}>{this.props.teamName}</label><br />
            </div>
        )
    }


}

export default Checkbox;