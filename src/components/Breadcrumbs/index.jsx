import styles from './style.postcss';

import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactGA from 'react-ga';
import is from 'is_js';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

const RESIZE_DEBOUNCE_MS = 100;

class Breadcrumbs extends Component {
  constructor() {
    super();
    this.state = {
      isIntermediateCrumbsCollapsed: false,
      collapsedAtWidth: null,  // populated below
    };
  }

  componentDidMount() {
    this._updateIntermediateCrumbsCollapsedState();
    window.addEventListener('resize', this.onResizeHandler = debounce(() => {
      this._updateIntermediateCrumbsCollapsedState();
    }, RESIZE_DEBOUNCE_MS, {
      leading: true,  // nicer iOS screen rotate
      trailing: true,
    }), false);
  }

  componentDidUpdate() {
    this._updateIntermediateCrumbsCollapsedState();
  }

  componentWillUnmount() {
    if (! this.onResizeHandler) return;
    window.removeEventListener('resize', this.onResizeHandler);
  }

  _isOverflowingHorizontally() {  // returns: content width (if overflowing)
    const el = this.listNode;
    const curOverflow = el.style.overflow;

    // set overflows: ul hidden, children visible
    if (! curOverflow || curOverflow === 'visible') {
      el.style.overflow = 'hidden';
    }
    const childOverflows = [];
    Array.prototype.forEach.call(el.children, (childEl) => {
      childOverflows.push(childEl.style.overflow);
      childEl.style.overflow = 'visible';  // eslint-disable-line
    });

    // check clientWidth against scrollWidth; scrollWidth is the width of content
    const isOverflowing = el.clientWidth < el.scrollWidth;
    const { scrollWidth } = el;

    // restore overflow
    el.style.overflow = curOverflow;
    Array.prototype.forEach.call(el.children, (childEl) => {
      childEl.style.overflow = childOverflows.shift();  // eslint-disable-line
    });

    return isOverflowing && scrollWidth;
  }

  _updateIntermediateCrumbsCollapsedState() {
    if (! this.props.singleLineMode || ! this.listNode) return;

    const navBoxSizing = this.navNode.style.boxSizing;
    this.navNode.style.boxSizing = 'content-box';  // to get width without padding
    const navWidth = Number.parseInt(
      getComputedStyle(this.navNode)
        .getPropertyValue('width')
    , 10);
    this.navNode.style.boxSizing = navBoxSizing;  // restore

    let contentWidth;
    if (this.state.isIntermediateCrumbsCollapsed &&
        (is.not.number(this.state.collapsedAtWidth) ||
        navWidth > this.state.collapsedAtWidth)) {
      this.setState({
        isIntermediateCrumbsCollapsed: false,
        collapsedAtWidth: null,
      });
    } else if (! this.state.isIntermediateCrumbsCollapsed &&  // eslint-disable-line
        (contentWidth = this._isOverflowingHorizontally())) {
      // overflowing - collapse intermediate crumbs
      this.setState({
        isIntermediateCrumbsCollapsed: true,
        collapsedAtWidth: navWidth > this.state.collapsedAtWidth ||
            is.not.number(this.state.collapsedAtWidth) ?
              contentWidth :
              this.state.collapsedAtWidth,
      });
    }
  }

  render() {
    if (! this.props.items || this.props.items.length <= 1) return null;

    // make a copy of props.items so that we can mangle it
    let itemsToRender = this.props.items;
    // push collapsed intermediate crumbs if enabled
    if (this.state.isIntermediateCrumbsCollapsed) {
      itemsToRender = [this.props.items[0]];
      if (this.props.items.length > 2) {
        itemsToRender.push({
          label: '…',
          clickable: false,
        });
      }
      itemsToRender.push(this.props.items[this.props.items.length - 1]);
    }

    return <nav className={classnames(styles.Breadcrumbs, this.props.className, {
      [styles.__wrap]: ! this.props.singleLineMode,
    })}>
      <ul className={styles.Breadcrumbs_list}
          ref={(_node) => {
            if (! _node) return;
            this.listNode = _node;
            this.navNode = _node.parentElement;
          }}>
        {itemsToRender.map((item, idx) => {
          const indexedCrumbClassName = styles[`Breadcrumbs_crumb_${idx}`];
          const itemClassNames = classnames(styles.Breadcrumbs_crumb, {
            [indexedCrumbClassName]: !! indexedCrumbClassName,
            [styles.__clickable]: !! item.clickable,
          });
          const itemKey = item.label + item.href;
          return <li key={itemKey}
              className={itemClassNames}>
            {item.clickable ? <Link to={item.href}
                onClick={onClick}
                draggable={false}>
              {item.label}
            </Link> : <span>
              {item.label}
            </span>}
          </li>;

          function onClick() {
            ReactGA.event({
              category: 'Navigation',
              action: 'Clicked breadcrumb',
              label: `Clicked breadcrumb ${item.label}`,
            });
          }
        })}
      </ul>
    </nav>;
  }
}

Breadcrumbs.propTypes = {
  className: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
    clickable: React.PropTypes.bool.isRequired,
  })).isRequired,
  singleLineMode: React.PropTypes.bool,
};

export default Breadcrumbs;
