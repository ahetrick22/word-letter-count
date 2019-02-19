import React, { Component } from 'react';
const d3 = require('d3');

export default class Viz extends Component {
  componentDidMount() {
  	this.draw(this.props)
  }
  // componentDidUpdate(prevProps){
  //   //this makes sure we don't redraw unnecessarily --
  //   //only when we add a new shape
  //   if(this.props.shapes.length !== prevProps.shapes.length){
  //     d3.select('.viz > *').remove();
  //     this.draw(this.props)
  //   }
  // }

  render() {
    return (
      <div className="viz" />
    )
  }
  
  draw = ({ data }) => {

    //assign margins
    const margin = { left:80, right:20, top:50, bottom:100 };
    const width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    //build canvas
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const g = d3.select('.viz').append('svg')
      .attr('height', h)
      .attr('width', w)
      .attr('id', 'svg-viz')
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    // X Label
    g.append("text")
        .attr("y", height + 50)
        .attr("x", width / 2)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Letter");

    // Y Label
    g.append("text")
        .attr("y", -60)
        .attr("x", -(height / 2))
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Count");

    //restructure data to consistent format
    const dataArr = [];
    for (const key in data) {
      const newObj = {
        letter : key,
        count : data[key]
      };
      dataArr.push({...newObj});
    };

    //clean data
    dataArr.forEach(d => d.count = +d.count)

 // X Scale
 const x = d3.scaleBand()
 .domain(dataArr.map(d => d.letter))
 .range([0, width])
 .padding(0.2);

// Y Scale
const y = d3.scaleLinear()
 .domain([0, d3.max(dataArr, d => d.count)])
 .range([height, 0]);

// X Axis
const xAxisCall = d3.axisBottom(x);
g.append("g")
 .attr("class", "x axis")
 .attr("transform", "translate(0," + height +")")
 .call(xAxisCall);

// Y Axis
const yAxisCall = d3.axisLeft(y)
g.append("g")
 .attr("class", "y axis")
 .call(yAxisCall);

// Bars
const rects = g.selectAll("rect")
 .data(dataArr)
 
rects.enter()
 .append("rect")
     .attr("y", d => y(d.count))
     .attr("x", d => x(d.letter))
     .attr("height", d => height - y(d.count))
     .attr("width", x.bandwidth)
     .attr("fill", "blue");

}
}
