import 'react-select/dist/react-select.css';
import styles from './style.postcss';

import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { HOC as FormsyDecorator } from 'formsy-react';
import classnames from 'classnames';

class Select extends Component {

  getClasses() {
    if (this.props.showRequired()) {
      return styles.__required;
    }
  }

  render() {
    const classes = classnames(styles.Select, this.getClasses());
    return <div className={classes}>
      <label>
        <span className={styles.Select_label}>{this.props.label}</span>
        <ReactSelect className={styles.Select_element} {...this.props} />
      </label>
    </div>;
  }

}

export default FormsyDecorator(Select);
