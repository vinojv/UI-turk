import React, {Component} from 'react';
import classNames from 'classnames';
import styles from '../styles/editorPage.css';
import ChatBox from './chatBox';
import Preview from './preview';

class EditorPage extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<div className={styles.wrapper}>
            <div className={styles.bgCard}></div>
            <ChatBox/>
            <Preview/>

        </div>)
    }

}
;

export default EditorPage;