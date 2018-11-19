import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import Chart from './Chart';
import Sideform from './Sideform';
import Labels from './Labels';
import axios from 'axios';
import * as d3 from 'd3'; 


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
        var tooltip = d3.select("body").append("div")	
            .attr("class", "tooltip")
            .attr("id", "tooltip")			
            .style("opacity", 0);
        

        axios.get('/api/data')
            .then(resp => {
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

    onMouseMove(e) {
        var x = e.screenX;
        var y = e.screenY;
        
        var tooltip = d3.select("#tooltip");
        console.log(tooltip.style.top);

        
        tooltip.style.top = (y - 60) + 'px';
        tooltip.style.left = (x - 50) + 'px';
    }

    render() {
        return (
            <div className="container-fluid no-gutters" onMouseMove={this.onMouseMove.bind(this)}>
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