import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class Line extends React.Component {
    constructor(props){
        super(props)
        this.state = {
             pageHeader: "Default Header",
             margin: { top: 20, right: 20, bottom: 30, left: 50 },
             teamid: this.props.teamid
            };
    }

    componentDidMount() {
        this.drawLine();
    }

    componentDidUpdate() {
        this.modLine()
    }

    prepData() {

        let scales = this.props.scales;
        let scaleupper = scales[0];
        let scalelower = scales[1];
        

        let svgWidth = $("#d3-content").width();
        let newlinearr = [];
        console.log(this.props.data.length);
        let margin = { top: 20, right: 20, bottom: 30, left: 50 };

        let width = svgWidth - margin.left - margin.right;
        let height = 600 - this.state.margin.top - this.state.margin.bottom;

        let xScale = d3.scaleTime()
            .domain([0, this.props.data.length])
            .rangeRound([0,width]);  

        let yScale = d3.scaleLinear()
            .domain([scalelower,scaleupper])
            .rangeRound([height, 0]);

        for(let i in this.props.data) {
            i = parseInt(i);
            newlinearr.push([xScale(i), yScale(this.props.data[i])]);
            i = i + 1;
        }

        return newlinearr;


    }

    modLine() {

        let newlinearr = this.prepData();

        var newline2 = d3.line();
        d3.select("#" + this.props.teamid + "-line").transition().attr('d', newline2(newlinearr));
    }

    handleOnClick(id){
        // d3.select("#"+ id).attr("z-index", 10).attr("stroke-width", 5).attr("stroke", "#e90052");
        
    }

    handleMouseOut(id){
        console.log(id);
        d3.select("#" +id)
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3);

    }

    drawLine() {

        let tipid = this.props.teamid + "-tooltip";

        // window.onmousemove = function (e) {
        //     var x = e.clientX,
        //         y = e.clientY;
        //     tooltip.style.top = (y - 60) + 'px';
        //     tooltip.style.left = (x - 50) + 'px';
        // };
        
        let newlinearr = this.prepData();

        let newline2 = d3.line();

        let svg = d3.select("svg")

        let g = svg.append("g")
        .attr("transform", "translate(" + this.state.margin.left + "," + this.state.margin.top + ")")
        .attr("id", "gID");

        let lineid = this.props.teamid + "-line";

        g.append("path")
            .datum(newlinearr)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 3)
            .attr("z-index", 0)
            .attr("d", newline2) 
            .attr("id", lineid) 
            //.on("mouseover", handleMouseOver)
            .on("mouseout", d => {
                d3.select("#"+lineid)
                .attr("stroke", "steelblue")
                .attr("stroke-width", 3);

                d3.select(".tooltip")
                    .style("opacity", 0);
                    
            })
            .on("mouseover", d => {
                d3.select("#"+lineid)
                    .attr("z-index", 10)
                    .attr("stroke-width", 5)
                    .attr("stroke", "#e90052");
                
                d3.select(".tooltip")
                    .html("<div class='tooltipcontent'><li class='tooltiptext'>"+this.props.teamname+"</li><li><span class='badge-50 "+ this.props.teamid + " tooltiplogo'></span></li></div> ")
                    .style("left", (d3.event.pageX - 50) + "px")		
                    .style("top", (d3.event.pageY - 60) + "px")
                    .style("opacity", .85);
            })
            .on("mousemove", d => {
                d3.select(".tooltip")
                    .style("left", (d3.event.pageX - 50) + "px")		
                    .style("top", (d3.event.pageY - 60) + "px");
            });
            
    }

    render() {
        return(
            null
        )
    }
}

export default Line;