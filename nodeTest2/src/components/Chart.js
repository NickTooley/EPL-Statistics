import React from 'react';
import Line from './Line';
import PropTypes from 'prop-types';
import * as d3 from "d3";

class Chart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            height: "0",
            width: "0"
            }   
        }

    componentDidMount() {
        this.drawChart();

      }

    drawChart() {
        let svgWidth = $("#d3-content").width(), svgHeight = 600;
        let margin = { top: 20, right: 20, bottom: 30, left: 50 };
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;

        let svg = d3.select("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("class", "line-graph");

        let g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("id", "gID");

        let x = d3.scaleTime()  
            .domain([new Date(1993,0,0), new Date(2018,0,0)])
            .rangeRound([0,width]);    
    
        let y = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([21,1]);

        let xAxis = d3.axisBottom(x)
            .ticks(24);

        let yAxis = d3.axisRight(y)
            .ticks(21)
            .tickSize(width);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .select(".domain")
            .attr("stroke", "white");
    
        g.append("g")
            .attr("class", "yAxis")
            .call(yAxis)
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", -30)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .attr("fill", "white");
    
        g.append("g")
            .select(".domain")
            .attr("stroke", "white")
            .remove();
    
        g.selectAll(".tick line").attr("stroke", "#fff").attr("stroke-opacity", "0.05").attr("stroke-width", 2);
        g.selectAll(".tick text").attr("fill", "white").attr("padding", "2px");

        console.log(this.props.scales);
    }

    render() {
        return(
            <div>
                <svg></svg> 
                {this.props.data.map(data => 
                    <Line key={data.teamID} data={data.dataSet} width={this.state.width} height={this.state.height} scales={this.props.scales} teamid={data.teamID} teamname={data.teamName} />   
                )}
            </div>
        )
    }
}

Chart.propTypes = {
    data: PropTypes.array
};

export default Chart;
