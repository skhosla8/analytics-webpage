import React, { useEffect } from 'react';
import * as d3 from 'd3';

function ProductGraph({ data, width, height }) {
  useEffect(() => {
    async function drawGraph() {
      const sales = await data;

      d3.select('.product-graph')
        .select('svg')
        .remove();

      const margin = { top: 50, right: 50, bottom: 50, left: 50 };

      const svg = d3
        .select('.product-graph')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const xScale = d3
        .scaleTime()
        .domain([new Date(2017, 0, 1), new Date(2017, 11, 31)])
        .range([0, width]);

      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat('%b'))
        .tickSize(0);

      const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(sales, (d) => d.retailSales)]);

      const retailLine = d3
        .line()
        .x(d => xScale(new Date(d.weekEnding)))
        .y(d => yScale(d.retailSales));

      const wholesaleLine = d3
        .line()
        .x(d => xScale(new Date(d.weekEnding)))
        .y(d => yScale(d.wholesaleSales));

      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .attr('class', 'x-axis')
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'start')
        .style('font-size', '0.7rem')
        .attr('fill', 'gray')
        .attr('dx', '-0.1em')
        .attr('dy', '2em');

      svg
        .append('g')
        .attr('class', 'y-axis')
        .attr('stroke-width', 0)
        .call(d3.axisLeft(yScale));

      svg
        .append('path')
        .datum(sales)
        .attr('fill', 'none')
        .attr('stroke', '#46a8f6')
        .attr('stroke-width', 2)
        .attr('class', 'line')
        .attr('d', retailLine);

      svg
        .append('path')
        .datum(sales)
        .attr('fill', 'none')
        .attr('stroke', 'lightgray')
        .attr('stroke-width', 2)
        .attr('class', 'line')
        .attr('d', wholesaleLine);
    }
    drawGraph();
  }, [data, width, height]);

  return (
    <div className="product-graph">
      <div className="product-graph__title">Retail Sales</div>
    </div>
  )
}

export default ProductGraph;