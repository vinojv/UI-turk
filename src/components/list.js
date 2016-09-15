import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class List extends Component {
    constructor(props, context){
        super(props, context);

    }

    render() {
        var {title, values} = this.props.data;
        console.log(this.props.data)
        return (<div>
            {title && <h3>{title}</h3>}
            <ul>
                {values.map(value=><li key={_.uniqueId()}>{value}</li>)}
            </ul>
        </div>)
    }

};
export default List;