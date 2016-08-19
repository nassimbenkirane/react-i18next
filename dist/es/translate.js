var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export default function translate(namespaces) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var _options$withRef = options.withRef;
  var withRef = _options$withRef === undefined ? false : _options$withRef;
  var _options$wait = options.wait;
  var wait = _options$wait === undefined ? false : _options$wait;
  var _options$translateFun = options.translateFuncName;
  var translateFuncName = _options$translateFun === undefined ? 't' : _options$translateFun;


  return function Wrapper(WrappedComponent) {
    var Translate = function (_Component) {
      _inherits(Translate, _Component);

      function Translate(props, context) {
        _classCallCheck(this, Translate);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Translate).call(this, props, context));

        _this.i18n = context.i18n;
        namespaces = namespaces || _this.i18n.options.defaultNS;

        _this.state = {
          i18nLoadedAt: null,
          ready: false
        };

        _this.onI18nChanged = _this.onI18nChanged.bind(_this);
        return _this;
      }

      _createClass(Translate, [{
        key: 'getChildContext',
        value: function getChildContext() {
          return _defineProperty({}, translateFuncName, this[translateFuncName]);
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          this[translateFuncName] = this.i18n.getFixedT(null, namespaces);
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this.mounted = true;
          this.i18n.loadNamespaces(namespaces, function () {
            if (_this2.mounted) _this2.setState({ ready: true });
          });
          this.i18n.on('languageChanged loaded', this.onI18nChanged);
          this.i18n.store && this.i18n.store.on('added removed', this.onI18nChanged);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.mounted = false;
          if (this.onI18nChanged) {
            this.i18n.off('languageChanged', this.onI18nChanged);
            this.i18n.off('loaded', this.onI18nChanged);
            this.i18n.store.off('added', this.onI18nChanged);
            this.i18n.store.off('removed', this.onI18nChanged);
          }
        }
      }, {
        key: 'onI18nChanged',
        value: function onI18nChanged() {
          if (!this.mounted) return;

          this.setState({ i18nLoadedAt: new Date() });
        }
      }, {
        key: 'getWrappedInstance',
        value: function getWrappedInstance() {
          if (!withRef) {
            // eslint-disable-next-line no-console
            console.error('To access the wrapped instance, you need to specify ' + '{ withRef: true } as the second argument of the translate() call.');
          }

          return this.refs.wrappedInstance;
        }
      }, {
        key: 'render',
        value: function render() {
          var _state = this.state;
          var i18nLoadedAt = _state.i18nLoadedAt;
          var ready = _state.ready;

          var extraProps = _defineProperty({ i18nLoadedAt: i18nLoadedAt }, translateFuncName, this[translateFuncName]);

          if (withRef) {
            extraProps.ref = 'wrappedInstance';
          }

          if (!ready && wait) return null;

          return React.createElement(WrappedComponent, _extends({}, this.props, extraProps));
        }
      }]);

      return Translate;
    }(Component);

    Translate.WrappedComponent = WrappedComponent;

    Translate.contextTypes = {
      i18n: PropTypes.object.isRequired
    };

    Translate.childContextTypes = _defineProperty({}, translateFuncName, PropTypes.func.isRequired);

    Translate.displayName = 'Translate(' + getDisplayName(WrappedComponent) + ')';

    Translate.namespaces = namespaces;

    return hoistStatics(Translate, WrappedComponent);
  };
}