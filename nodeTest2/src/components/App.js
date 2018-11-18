import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import Chart from './Chart';
import Sideform from './Sideform';
import Labels from './Labels';
import axios from 'axios';


class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
             pageHeader: "Default Header",
             data: [],
             scale: [0,0]
            };
    }
    
    componentDidMount() {
        console.log('did mount');
        axios.get('/api/data')
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    data: resp.data,
                    scale: [1,21]
                })
            })
            .catch(console.error);
    }

    componentWillUnmount() {
        console.log('will Unmount');
    }

    render() {
        return (
            <div className="container-fluid no-gutters">
                <Header teams={this.state.data}/>
                <div className="row justify-content-center content-div no-gutters" >
                    <div className="col-9">
                        <div className="row">
                            <Sideform teams={this.state.data}/>
                            
                            <div className="col-sm-10" id="d3-content">
                                <Chart data={this.state.data} scales={this.state.scale}/>
                                <Labels />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

App.defaultProps = {
    headerMessage: 'Default Prop'
};


App.propTypes = {
    headerMessage: PropTypes.string
};

export default App;