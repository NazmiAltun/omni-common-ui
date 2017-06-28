'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders its children', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement('div', { id: 'innerContent' })
  ));
  expect(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).toBe(true);
});

test('allows to add custom classes', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: 'aClass' }));
  expect(wrapper.find('.aClass')).toHaveLength(1);
});
//# sourceMappingURL=spec.js.map