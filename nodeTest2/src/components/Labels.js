import React from 'react';
import PropTypes from 'prop-types';

class Labels extends React.Component {

    render() {
        return (
            <div className="graph-labels">
                    <ul className="graph-labels-ul">
                        <li className="labels">
                            <input type="radio" name="graph-rb" id="positions-rb" onclick="changedataset('position')" defaultChecked/>
                            <label htmlFor="positions-rb">Position</label>
                        </li>
                        <li className="labels">
                            <input type="radio" name="graph-rb" id="points-rb" onclick="changedataset('points')"/>
                            <label htmlFor="points-rb">Points</label>
                        </li>
                        <li className="labels">
                            <input type="radio" name="graph-rb" id="wins-rb" onclick="changedataset('wins')"/>
                            <label htmlFor="wins-rb">Wins</label>
                        </li>
                        <li className="labels">
                            <input type="radio" name="graph-rb" id="draws-rb" onclick="changedataset('draws')"/>
                            <label htmlFor="draws-rb">Draws</label>
                        </li>
                        <li className="labels">
                            <input type="radio" name="graph-rb" id="losses-rb" onclick="changedataset('losses')"/>
                            <label htmlFor="losses-rb">Losses</label>
                        </li>
                    </ul>
                <div className="row align-items-center flex-md-row flex-column d-flex no-gutters labels-row2">
                    <ul className="graph-labels-ul">
                        <li className="labels">
                                <input type="radio" name="graph-rb" id="goalsFor-rb" onclick="changedataset('goalsFor')"/>
                                <label htmlFor="goalsFor-rb">Goals For</label>
                        </li>
                        <li className="labels">
                                <input type="radio" name="graph-rb" id="goalsagainst-rb" onclick="changedataset('goalsagainst')"/>
                                <label htmlFor="goalsagainst-rb">Goals Against</label>
                        </li>
                        <li className="labels">
                                <input type="radio" name="graph-rb" id="goaldiff-rb" onclick="changedataset('goaldiff')"/>
                                <label htmlFor="goaldiff-rb">Goal Difference</label>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Labels;