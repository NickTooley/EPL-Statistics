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