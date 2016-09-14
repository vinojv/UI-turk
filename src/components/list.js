import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
    constructor(props, context){
        super(props, context);

    }

    render() {
        var {title, values} = this.props.data;
        return (<div>
            {title && <h3>{title}</h3>}
            <ul>
                {values.map(value=><li>{value}</li>)}
            </ul>
        </div>)
    }

};