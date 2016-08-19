'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18nextProvider = exports.Interpolate = exports.translate = exports.loadNamespaces = undefined;

var _translate = require('./translate');

var _translate2 = _interopRequireDefault(_translate);

var _interpolate = require('./interpolate');

var _interpolate2 = _interopRequireDefault(_interpolate);

var _I18nextProvider = require('./I18nextProvider');

var _I18nextProvider2 = _interopRequireDefault(_I18nextProvider);

var _loadNamespaces = require('./loadNamespaces');

var _loadNamespaces2 = _interopRequireDefault(_loadNamespaces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.loadNamespaces = _loadNamespaces2.default;
exports.translate = _translate2.default;
exports.Interpolate = _interpolate2.default;
exports.I18nextProvider = _I18nextProvider2.default;