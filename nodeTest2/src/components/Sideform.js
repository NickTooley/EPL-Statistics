import React from 'react';
import PropTypes from 'prop-types';

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
                            <div className="form-checkboxes">
                                <input type="checkbox" name="cb" id={data.teamID} defaultChecked/>
                                <label htmlFor={data.teamID}>{data.teamName}</label><br />
                            </div>
                        )}
                </div>
        )
    }

}

export default Sideform;