// import React, { useEffect } from 'react';
// import * as d3 from 'd3';

// const Viz = ({data}) => {
//   useEffect(() => {
//    d3.select('.viz > *').remove();
//    draw(data)
//  }, [props.shapes.length])
//   return <div className="viz" />
// }

// const draw = data => {
//     const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//     const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
//     d3.select('.viz').append('svg')
//       .attr('height', h)
//       .attr('width', w)
//       .attr('id', 'svg-viz')

//       // X Label
//       g.append("text")
//       .attr("y", height + 50)
//       .attr("x", width / 2)
//       .attr("font-size", "20px")
//       .attr("text-anchor", "middle")
//       .text("Month");

//       // Y Label
//       g.append("text")
//       .attr("y", -60)
//       .attr("x", -(height / 2))
//       .attr("font-size", "20px")
//       .attr("text-anchor", "middle")
//       .attr("transform", "rotate(-90)")
//       .text("Revenue");

//     // Bars
//     var rects = g.selectAll("rect")
//     .data(data)
    
//     rects.enter()
//     .append("rect")
//         .attr("y", function(d){ return y(d.revenue); })
//         .attr("x", function(d){ return x(d.month) })
//         .attr("height", function(d){ return height - y(d.revenue); })
//         .attr("width", x.bandwidth)
//         .attr("fill", "blue");
  
//   }
// export default Viz