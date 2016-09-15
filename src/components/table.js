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
                <tr>
                    {headers.map(header=><td>{header}</td>)}

                </tr>
                    {/*<rows values={headers}></rows>*/}
                </thead>
                <tbody>
                    {values.map(value=><tr>{value.map(tds=><td>{tds}</td>)}</tr>)}
                    {/*<rows values={values}></rows>*/}
                </tbody>
            </table>

        </div>)
    }

};

export default Table;