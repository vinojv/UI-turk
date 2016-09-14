import React, { Component } from 'react';


const rows = ({values}) => (values.map((columns)=><tr>
        {columns.map((column)=><td>{column}</td>)}
    </tr>));

class Table extends Component {
    constructor(props, context){
        super(props, context);

    }

    render() {
        var {headers, values} = this.props.data;

        return (<div>
            <table>
                <thead>
                    <rows values={headers}></rows>
                </thead>
                <tbody>
                    <rows values={values}></rows>
                </tbody>
            </table>

        </div>)
    }

};