import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

class Labels extends React.Component {

    render() {
        return (
            <div className="graph-labels">
                    <ul className="graph-labels-ul">
                        <Label type={"positions"} func={this.props.func} def={true}/>
                        <Label type={"points"} func={this.props.func}/>
                        <Label type={"wins"} func={this.props.func}/>
                        <Label type={"draws"} func={this.props.func}/>
                        <Label type={"losses"} func={this.props.func}/>
                    </ul>
                <div className="row align-items-center flex-md-row flex-column d-flex no-gutters labels-row2">
                    <ul className="graph-labels-ul">
                        <Label type={"goalsfor"} func={this.props.func}/>
                        <Label type={"goalsagainst"} func={this.props.func}/>
                        <Label type={"goaldiff"} func={this.props.func}/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Labels;