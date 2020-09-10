/**
 * Sets the value of your styled component property from a map object depending on a prop match hassle-free.
 *
 * @param {object} map the map to apply the style value from when checking for props
 * @param {string} fallbackValueKey fallback map key value to use if an invalid value gets matched from the map
 */
export function styledProps(map: object, fallbackValueKey: string): (props: any) => any;
/**
 * Sets the value of your styled component property from a map object located in your theme depending on a prop match hassle-free.
 *
 * @param {string} themeMapKey the key of the map inside your theme object, used to apply the style value from when checking for props
 * @param {*} fallbackValueKey fallback value to use if an invalid value gets matched from the map
 */
export function styledThemeProps(themeMapKey: string, fallbackValueKey: any): (props: any) => (props: any) => any;
/**
 * Maps all object properties that contain valid maps to styledProps/styledThemeProps
 *
 * @param {object|string} obj object whose map containing properties to flatten to a styled object or the string key inside your theme object
 */
export function styledMappedProps(obj: object | string): {};
export { styledMappedProps as styledMappedThemeProps };
export default styledProps;
