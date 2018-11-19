import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import Checkbox from './Checkbox';

class Sideform extends React.Component {
    constructor(props){
        super(props)
        this.state = {
             pageHeader: "Default Header" 
            };
    }

    handleMouseOver(id){
        console.log(id);
        // d3.select("#" + id + "-line").attr("z-index", 10).attr("stroke-width", 5).attr("stroke", "#e90052");
    }

    componentDidMount(){
        // d3.select(".checkLabel").on("mouseover", this.handleMouseOver(data.teamID))
    }

    render() {
        return(
                <div className="col-sm-2 d-none d-lg-block form-overlay">
                    <h3>Filter Teams</h3>
                        {this.props.teams.map (data =>
                            <Checkbox key={data.teamID} teamID={data.teamID} teamName={data.teamName} />
                        )}
                </div>
        )
    }

}

export default Sideform;