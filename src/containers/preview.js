import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graph from '../components/graph';
import List from '../components/list';
import Table from '../components/table';

class Preview extends Component {
	constructor(props, context){
		super(props, context);

	}
	render (){
        var {contents} = this.props;
		return (<div className="Container">
	      Containers
            {contents.map(function(content){
                if (content.type == 'graph' ) return <Graph key = {content.id} data={content}></Graph>;
                if (content.type == 'list' ) return <List key = {content.id} data={content}></List>;
                if (content.type == 'table' ) return <Table key = {content.id} data={content}></Table>;
            })}
	    </div>)

	}
}

var convertStateToProps = function (state) {
    return {
        contents: [...state]
    }
};

var dispatcher = function (dispatch) {
    return {

    }
}
export default connect(convertStateToProps, dispatcher)(Preview);