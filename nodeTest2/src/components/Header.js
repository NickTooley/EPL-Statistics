import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Header extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
                
            <div className="d-flex align-items-start flex-md-row flex-column" >
                <div className="header-logo">
                    <a href="/" ><img src="static/premier-league-logo-header.svg" /></a>
                </div>
            <header>

                <div className="row  align-items-center flex-md-row flex-column d-flex badges">
                        <ul className="clubs">
                        {this.props.teams.map(data => 
                                <li key={data.teamID}><a className="d-none d-md-block headericons" href="#"><span className={"badge-50 headerspan " + data.teamID} ></span></a></li>
                            )}

                        </ul>
                </div>
                <div className="row subheader">
                    <div className="col-12 fill-block">
        
                    </div>
                </div>
            </header>
            </div>
        )
    }
}

Header.defaultProps = {
    message: 'Default He3ader'
};


Header.propTypes = {
    message: PropTypes.string
};

export default Header;