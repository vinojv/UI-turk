import React, {Component} from 'react';
import {connect} from 'react-redux';
import Graph from '../components/graph';
import List from '../components/list';
import Table from '../components/table';
import classNames from 'classnames';
import styles from '../styles/preview.css';

class Preview extends Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        var {contents} = this.props;
        console.log(contents);
        return (<div className={classNames("Container", styles.container)}>
            <div className={styles.previewWrapper}>
                <h2 className={styles.title}>PREVIEW</h2>
                <div className={styles.tabs}>
                    <ul className="clearfix">
                        <li>Tables</li>
                        <li>Graphs</li>
                        <li>Lists</li>
                    </ul>
                </div>
                <div className={styles.contentPreview}>
                    {contents.map((content)=> {
                        if (content.type == 'graph') return <Graph key={content.id} data={content.data}></Graph>;
                        if (content.type == 'list') return <List key={content.id} data={content.data}></List>;
                        if (content.type == 'table') return <Table key={content.id} data={content.data}></Table>;
                        return 'Invalid'
                    })}
                </div>
            </div>
            <div className={styles.contentPagination}>
                <div className={classNames(styles.paginationBox,"clearfix")}>
                    <span> &lt; </span>
                    <div>
                        <span className={styles.contentPaginationCount}>1</span>
                        <span className={styles.contentPaginationText}>of</span>
                        <span className={styles.contentPaginationCount}>7</span>
                    </div>
                    <span> &gt; </span>
                </div>
            </div>
        </div>)

    }
}

var convertStateToProps = function (state) {
    console.log("convertStateToProps", state)
    return {
        contents: [...state]
    }
};

var dispatcher = function (dispatch) {
    return {}
}
export default connect(convertStateToProps, dispatcher)(Preview);