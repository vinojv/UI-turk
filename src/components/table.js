import React, { Component } from 'react';
import _ from 'lodash';

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
                <tr>
                    {headers.map(header=><td key={_.uniqueId()}>{header}</td>)}

                </tr>
                    {/*<rows values={headers}></rows>*/}
                </thead>
                <tbody>
                    {values.map(value=><tr key={_.uniqueId()}>{value.map(tds=><td key={_.uniqueId()}>{tds}</td>)}</tr>)}
                    {/*<rows values={values}></rows>*/}
                </tbody>
            </table>

        </div>)
    }

};

export default Table;