'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HistoryLink = function HistoryLink(props) {
  var currentRoute = props.routes[props.routes.length - 1];
  var history = currentRoute.history;

  if (_is_js2.default.function(currentRoute.canAccess) && !currentRoute.canAccess(props)) return null;

  if (!(_is_js2.default.object(history) || _is_js2.default.function(history))) return null;

  if (_is_js2.default.function(history)) {
    history = history(props);
  }

  if (history && _is_js2.default.not.string(history.link)) return null;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_style2.default.HistoryLink, props.className) },
    _react2.default.createElement(
      _reactRouter.Link,
      { to: history.link,
        draggable: false },
      'History',
      _react2.default.createElement(_Icon2.default, { id: 'history2' })
    )
  );
};

HistoryLink.propTypes = {
  className: _propTypes2.default.string,
  params: _propTypes2.default.object.isRequired,
  routes: _propTypes2.default.array.isRequired,
  buildRoute: _propTypes2.default.func.isRequired
};

exports.default = (0, _pure2.default)(HistoryLink);
//# sourceMappingURL=index.js.map