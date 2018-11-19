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
        this.changeData = this.changeData.bind(this)
    }
    
    componentDidMount() {
        var tooltip = d3.select("body").append("div")	
            .attr("class", "tooltip")
            .attr("id", "tooltip")			
            .style("opacity", 0);
        

        axios.get('/api/positions')
            .then(resp => {
                this.setState({
                    data: resp.data.data,
                    scale: resp.data.scales
                })
            })
            .catch(console.error);
    }

    changeData(dataType){
        console.log('/api/'+dataType);
        axios.get('/api/'+dataType)
            .then(resp => {
                console.log(resp.data.data);
                this.setState({
                    data: resp.data.data,
                    scale: resp.data.scales
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
        
        tooltip.style.top = (y - 60) + 'px';
        tooltip.style.left = (x - 50) + 'px';
    }

    click() {
        // axios.get('/api/points')
        //     .then(resp => {
        //         console.log(resp)
        //         this.setState({
        //             data: resp.data.data,
        //             scale: resp.data.scales
        //         })
        //     })
        //     .catch(console.error);
    }

    render() {
        return (
            <div className="container-fluid no-gutters" onMouseMove={this.onMouseMove.bind(this)} onClick={() => this.click()}>
                <Header teams={this.state.data}/>
                <div className="row justify-content-center content-div no-gutters" >
                    <div className="col-9">
                        <div className="row">
                            <Sideform teams={this.state.data}/>
                            
                            <div className="col-sm-10" id="d3-content">
                                <Chart data={this.state.data} scales={this.state.scale}/>
                                <Labels func={this.changeData}/>
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