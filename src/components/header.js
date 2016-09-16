import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../styles/header.css';

class Header extends Component {
    constructor(props, context){
        super(props, context);

    }

    render() {
        return (<div className={styles.header}>
                <span className={styles.logo}>UI TURK</span>
        </div>)
    }

};

export default Header;