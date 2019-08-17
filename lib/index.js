'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.styledProps = styledProps;
exports.styledThemeProps = styledThemeProps;
exports.styledMappedProps = styledMappedProps;
/**
 * Prefix used when throwing Errors whilst running in development mode
 */
var ERROR_PREFIX = '[styled-props-simplified]';

/**
 * Sets the value of your styled component property from a map object depending on a prop match hassle-free.
 *
 * @param {object} map the map to apply the style value from when checking for props
 * @param {string} fallbackValueKey fallback map key value to use if an invalid value gets matched from the map
 */
function styledProps(map, fallbackValueKey) {
  return function (props) {
    var PRODUCTION = process.env.NODE_ENV === 'production',
        styleToApplyFromProps = Object.keys(map).filter(function (key) {
      return props.hasOwnProperty(key) && props[key];
    });

    if (styleToApplyFromProps.length) {
      if (styleToApplyFromProps.length > 1 && !PRODUCTION) throw new Error(ERROR_PREFIX + ' You are trying to provide multiple props to an element at the same time: ' + styleToApplyFromProps.join(', ') + '.');

      var styleValueToApply = map[styleToApplyFromProps.shift()];

      if (styleValueToApply) return styleValueToApply;
    }

    if (fallbackValueKey) {
      var fallbackStyleToApply = fallbackValueKey && props[fallbackValueKey] && map.hasOwnProperty(props[fallbackValueKey]) ? map[props[fallbackValueKey]] : undefined;

      if (!fallbackStyleToApply && !PRODUCTION) throw new Error(ERROR_PREFIX + ' Invalid fallback value provided for "' + fallbackValueKey + '".');

      return fallbackStyleToApply;
    }

    return undefined;
  };
}

/**
 * Sets the value of your styled component property from a map object located in your theme depending on a prop match hassle-free.
 *
 * @param {string} themeMapKey the key of the map inside your theme object, used to apply the style value from when checking for props
 * @param {*} fallbackValueKey fallback value to use if an invalid value gets matched from the map
 */
function styledThemeProps(themeMapKey, fallbackValueKey) {
  return function (props) {
    var PRODUCTION = process.env.NODE_ENV === 'production',
        mapFromTheme = props.theme && props.theme.hasOwnProperty(themeMapKey) ? props.theme[themeMapKey] : null;

    if (!mapFromTheme && !PRODUCTION) throw new Error(ERROR_PREFIX + ' Invalid theme key provided "' + themeMapKey + '" or theme does not exist for this element.');

    if ((typeof mapFromTheme === 'undefined' ? 'undefined' : _typeof(mapFromTheme)) === 'object' && !(mapFromTheme instanceof Array)) return styledProps(mapFromTheme, fallbackValueKey);

    return undefined;
  };
}

/**
 * Maps all object properties that contain valid maps to styledProps/styledThemeProps
 *
 * @param {object|string} obj object whose map containing properties to flatten to a styled object or the string key inside your theme object
 */
function styledMappedProps(obj) {
  var methodToUse = typeof obj === 'string' ? styledThemeProps : styledProps;

  return Object.keys(obj).reduce(function (mapped, key) {
    var map = obj[key];

    if (map && (typeof map === 'undefined' ? 'undefined' : _typeof(map)) === 'object' && !(map instanceof Array)) mapped[key] = methodToUse(obj[key], key);

    return mapped;
  }, {});
}

exports.styledMappedThemeProps = styledMappedProps;
exports.default = styledProps;
//# sourceMappingURL=index.js.map