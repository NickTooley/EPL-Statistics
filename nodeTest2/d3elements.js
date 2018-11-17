var POINTSUPPER = 100;
var POINTSLOWER = 0;
var POSITIONUPPER = 1;
var POSITIONLOWER = 21;
var RESULTUPPER = 40;
var RESULTLOWER = 0;
var GOALSFORUPPER = 100;
var GOALSFORLOWER = 0;
var GOALSAGAINSTUPPER = 100;
var GOALSAGAINSTLOWER = 0;
var GOALDIFFUPPER = 80;
var GOALDIFFLOWER = -80;

var allTeams = [];

var tooltip = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var tooltip2 = d3.select("body").append("div")	
    .attr("class", "tooltip2")				
    .style("opacity", 0);

window.onmousemove = function (e) {
var x = e.clientX,
    y = e.clientY;
tooltip.style.top = (y - 60) + 'px';
tooltip.style.left = (x - 50) + 'px';
tooltip2.style.top = (y - 40) + 'px';
tooltip2.style.left = (x - 40) + 'px';
};

var svgWidth = $("#d3-content").width(), svgHeight = 600;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "line-graph");

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime()
    .domain([new Date(1993,0,0), new Date(2018,0,0)])
    .rangeRound([0,width]);    

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

// x.domain([0,15]);
y.domain([21,1]);

var newLine = d3.line()
    .x(function(d) { return x(d.round)})
    .y(function(d) { return y(d.value)})
    // x.domain(d3.extent(arr, function(d) { return d.round}));
    
    // y.domain(d3.extent(arr, function(d) { return d.value}));
var xAxis = d3.axisBottom(x)
            .ticks(24);

var yAxis = d3.axisRight(y)
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

function new_Line_function(id, datas, scaleupper, scalelower){

    var height = svgHeight - margin.top - margin.bottom;
    console.log(height);

    var newlinearr = [];

    var x = d3.scaleLinear()
    // .domain([0,datas.length])
    .domain([0,datas.length])
    .rangeRound([0, width]);

    var y = d3.scaleLinear()
    .domain([scalelower,scaleupper])
    .rangeRound([height, 0]);

    for(var i in datas) {
        i = parseInt(i);
        newlinearr.push([x(i), y(datas[i])]);
        i = i + 1;
    }

    var newline2 = d3.line();

    var svg = d3.select("svg")

    var index = id.indexOf("-");
    var newID = id.substring(0,index);

    g.append("path")
    .datum(newlinearr)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 3)
    .attr("z-index", 0)
    .attr("d", newline2)    
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleOnClick)
    .attr("xlink:href", "{{ url_for('teams.show_team', team='') }}"+newID)
    .attr("id", id);
}

function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].id);
        }
    }
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}




$(() => {
    $("#send").click( ()=>{
        var message = {name: $("#name").val(), message: $("#message").val()}
        postMessage(message)
    })
    
    getData();

    
    console.log(allTeams.length);
    
    })


function addMessages(message){
    $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`)
}

function getData() {
    $.get('http://0.0.0.0:3000/leaguedata?type=points', (data) => {
        // data.forEach(addMessages)
        data.forEach(element => {
            // console.log(element.points);
            allTeams.push(element);
            console.log(allTeams.length);
        });
        var formCheckBoxes = $("fillTeams");
        var checkedteams = getCheckedBoxes("cb");
        
        for(var i = 0; i < allTeams.length; i++){
            console.log(allTeams.length);
            var label = allTeams[i].teamID + "-line";
            $("#fillTeams").append("<div class='form-checkboxes'>"+
                                        "<input type='checkbox' name='cb' id='"+allTeams[i].teamID+ "' onclick='handleChange(this)' checked/>"+
                                        "<label for='"+allTeams[i].teamID+ "' onmouseover=\"handleMouseOverForm('"+label+"')\" onmouseout=\"handleMouseOutForm('"+label+"')\">"+allTeams[i].teamName+"</label><br />"+
                                    "</div>");

            $("ul.clubs").append("<li><a class='d-none d-md-block headericons'  href='#'><span class='badge-50 "+ allTeams[i].teamID +" headerspan'></span></a></li>");
            
            // if(checkedteams.indexOf(allTeams[i].teamID) > -1){
            //     console.log(checkedteams);
            var teamid = allTeams[i].teamID+"-line";
            new_Line_function(label, allTeams[i].positions, 1, 21);
            // }
        }

    });
    
    
}

function handleMouseOver(d, i) {
    d3.select(this).attr("z-index", 10).attr("stroke-width", 5).attr("stroke", "#e90052").on("mousemove", handleMouseMove);
    var newID = d3.select(this).attr('id');
    var newIndex = newID.indexOf("-");
    var newIDStr = newID.substring(0,newIndex);
    
    for(var i = 0; i < allTeams.length; i++){
        if(allTeams[i].teamID == newIDStr){
            tooltip.transition().style("opacity", .85);
            tooltip.html("<div class='tooltipcontent'><li class='tooltiptext'>"+allTeams[i].teamName+"</li><li><span class='badge-50 "+ allTeams[i].teamID + " tooltiplogo'></span></li></div> ")
            .style("left", (d3.event.pageX - 50) + "px")		
            .style("top", (d3.event.pageY - 60) + "px");	
        }
    }

}

function handleMouseMove() {
    tooltip.style("left", (d3.event.pageX - 50) + "px")		
            .style("top", (d3.event.pageY - 60) + "px");
}

    function handleMouseOut(d, i) {
    tooltip.transition().style("opacity", 0);
    d3.select(this).attr("stroke-width", 3).attr("stroke", "steelblue").attr("z-index", 0);
}

function handleOnClick(d, i) {
    console.log(d3.select(this).attr("xlink:href"));
    window.location.href = d3.select(this).attr("xlink:href");
}

function changedataset(field){
        switch(field) {
            case "position":
                for(var i = 0; i < allTeams.length; i++){
                    var checkedteams = getCheckedBoxes("cb");
                    if(checkedteams.indexOf(allTeams[i].teamID) > -1){
                        var teamid = allTeams[i].teamID + "-line";
                        var positions = allTeams[i].positions;
                        modPathFun(teamid, positions, POSITIONUPPER, POSITIONLOWER);
                    }
                }
                break;
            
            case "points":
                for(var i = 0; i < allTeams.length; i++){
                    var checkedteams = getCheckedBoxes("cb");
                    if(checkedteams.indexOf(allTeams[i].teamID) > -1){
                        var points = allTeams[i].points;
                        var teamid = allTeams[i].teamID + "-line";
                        modPathFun(teamid, points, POINTSUPPER, POINTSLOWER);
                    }
                }   
                break;
            
            case "wins": 
                for(var i = 0; i < allTeams.length; i++){
                    var checkedteams = getCheckedBoxes("cb");
                    if(checkedteams.indexOf(allTeams[i].teamID) > -1){
                        var teamid = allTeams[i].teamID + "-line";
                        var wins = allTeams[i].wins;
                        modPathFun(teamid, wins, RESULTUPPER, RESULTLOWER);
                    }
                }
                break;

            case "draws": 
                for(var i = 0; i < allTeams.length; i++){
                    var checkedteams = getCheckedBoxes("cb");
                    if(checkedteams.indexOf(allTeams[i].teamID) > -1){
                        var teamid = allTeams[i].teamID + "-line";
                        var draws = allTeams[i].draws;
                        modPathFun(teamid, draws, RESULTUPPER, RESULTLOWER);
                    }
                }
                break;

            case "losses": 
                for(var i = 0; i < allTeams.length; i++){
                    var checkedteams = getCheckedBoxes("cb");
                    if(checkedteams.indexOf(allTeams[i].teamID) > -1){
                        var teamid = allTeams[i].teamID + "-line";
                        var losses = allTeams[i].losses;
                        modPathFun(teamid, losses, RESULTUPPER, RESULTLOWER);
                    }
                }
                break;

            case "goalsagainst": 
                for(var i = 0; i < allTeams.length; i++){
                    var checkedteams = getCheckedBoxes("cb");
                    if(checkedteams.indexOf(allTeams[i].teamID) > -1){
                        var teamid = allTeams[i].teamID + "-line";
                        var goalsagainst = allTeams[i].goalsagainst;
                        modPathFun(teamid, goalsagainst, GOALSAGAINSTUPPER, GOALSAGAINSTLOWER);
                    }
                }
                break;

            case "goalsfor": 
                for(var i = 0; i < allTeams.length; i++){
                    var checkedteams = getCheckedBoxes("cb");
                    if(checkedteams.indexOf(allTeams[i].teamID) > -1){
                        var teamid = allTeams[i].teamID + "-line";
                        var goalsfor = allTeams[i].goalsfor;
                        modPathFun(teamid, goalsfor, GOALSFORUPPER, GOALSFORLOWER);
                    }
                }
                break;

            case "goaldiff": 
                for(var i = 0; i < allTeams.length; i++){
                    var checkedteams = getCheckedBoxes("cb");
                    if(checkedteams.indexOf(allTeams[i].teamID) > -1){
                        var teamid = allTeams[i].teamID + "-line";
                        var goaldiff = allTeams[i].goaldiff;
                        modPathFun(teamid, goaldiff, GOALDIFFUPPER, GOALDIFFLOWER);
                    }
                }
                break;
        }
    
}

function modPathFun(id, datas, scaleupper, scalelower){
    var height = svgHeight - margin.top - margin.bottom;

    var newlinearr = [];

    var x = d3.scaleLinear()
    .domain([0,datas.length])
    .rangeRound([0, width]);

    y.domain([scalelower,scaleupper]);

    var yAxis2 = d3.axisRight(y)
    .ticks(21)
    .tickSize(width);

    svg.select(".yAxis").transition().call(yAxis2);

    g.selectAll(".tick line").attr("stroke", "#fff").attr("stroke-opacity", "0.05").attr("stroke-width", 2);
    g.selectAll(".tick text").attr("fill", "white").attr("padding", "2px");

    for(var i in datas) {
        i = parseInt(i);
        newlinearr.push([x(i), y(datas[i])]);
        i = i + 1;
    }

    var newline2 = d3.line();
    d3.select("#"+id).transition().attr('d', newline2(newlinearr));

}


function handleMouseOverForm(id) {
    d3.select("#" + id).attr("z-index", 10).attr("stroke-width", 5).attr("stroke", "#e90052");
}

function handleMouseOutForm(id) {
    d3.select("#" + id).attr("stroke-width", 3).attr("stroke", "steelblue").attr("z-index", 0);
}

function handleChange(checkbox){
    if(checkbox.checked){
        addLine(checkbox.id);
    }else{
        removeLine(checkbox.id);
    }
}

function removeLine(id) {
    d3.select("#"+id+"-line").remove();
}

function addLine(id) {
    var teamid = id+"-line";
    
    var data = null;
    var scaleupper = 0;
    var scalelower = 0;
    var toRetrieve = $("input[name=graph-rb]:checked").attr('id');
    
    switch(toRetrieve){
        case 'positions-rb':
            for(var i = 0; i < allTeams.length; i++){
                if(id == allTeams[i].teamID){
                    scaleupper = POSITIONUPPER;
                    scalelower = POSITIONLOWER;
                    data = allTeams[i].positions;
                    console.log(data);
                }
            } 
            break;
        case 'points-rb':
            for(var i = 0; i < allTeams.length; i++){
                if(id == allTeams[i].teamID){
                    scaleupper = POINTSUPPER;
                    scalelower = POINTSLOWER;
                    data = allTeams[i].points;
                }
            } 
            break;
        case 'draws-rb':
            for(var i = 0; i < allTeams.length; i++){
                if(id == allTeams[i].teamID){
                    scaleupper = RESULTUPPER;
                    scalelower = RESULTLOWER;
                    data = allTeams[i].draws;
                }
            } 
            break;
        case 'losses=rb':
            for(var i = 0; i < allTeams.length; i++){
                if(id == allTeams[i].teamID){
                    scaleupper = RESULTUPPER;
                    scalelower = RESULTLOWER;
                    data = allTeams[i].losses;
                }
            } 
            break;
        case 'goalsfor-rb':
            for(var i = 0; i < allTeams.length; i++){
                if(id == allTeams[i].teamID){
                    scaleupper = GOALSFORUPPER;
                    scalelower = GOALSFORLOWER;
                    data = allTeams[i].goalsfor;
                }
            } 
            break;
        case 'goalsagainst-rb':
            for(var i = 0; i < allTeams.length; i++){
                if(id == allTeams[i].teamID){
                    scaleupper = GOALSAGAINSTUPPER;
                    scalelower = GOALSAGAINSTLOWER;
                    data = allTeams[i].goalsagainst;
                }
            }  
            break;
        case 'wins-rb':
            for(var i = 0; i < allTeams.length; i++){
                if(id == allTeams[i].teamID){
                    scaleupper = RESULTUPPER;
                    scalelower = RESULTLOWER;
                    data = allTeams[i].wins;
                }
            }  
            break;
        case 'goaldiff-rb':
            for(var i = 0; i < allTeams.length; i++){
                if(id == allTeams[i].teamID){
                    scaleupper = GOALDIFFUPPER;
                    scalelower = GOALDIFFLOWER;
                    data = allTeams[i].goaldiff;
                }
            }   
            break;
            
    }
    if(data != null){
        
        new_Line_function(teamid, data, scaleupper, scalelower);
    }
}