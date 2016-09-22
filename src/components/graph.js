import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Chart} from 'react-google-charts';

class Graph extends Component {
    constructor(props, context){
        super(props, context);

    }

    render() {
    	let {rows, columns, options} = this.props;
        return (
        	<div className={"my-pretty-chart-container"}>
      			<Chart chartType = "LineChart" 
      					rows = {rows}
      					columns = {columns}
      					options = {options}
      					graph_id = "ScatterChart"
      					width={"100%"}
      					height={"400px"}
      					legend_toggle={true}
      			/>
        	</div>
        )
    }

};