# Styled Props Simplified

A small and simple library allowing you to set styled props in your [styled-components](https://www.styled-components.com/) stress-free.

#### Update: Now with TypeScript definitions

## Installation

npm
```bash
npm i @fristys/styled-props-simplified
```

yarn
```bash
yarn add @fristys/styled-props-simplified
```

## Why use this package and basic usage

You're probably quite used to writing something like this

```JSX
const Component = styled.div`
 background: ${props => (props.primary ? 'pink' : 'blue')}
`;

<Component primary></Component>
<Component></Component>
```

That's great and all, but it can get quite bloated with time in any project, especially if you had more than one extra color modifier.

With Styled Props Simplified you can now simply have a master file containing all your styles (or straight up [use your theme object](#use-with-themes)):

```javascript
export const colors = { primary: 'pink', secondary: 'blue', ternary: 'yellow' };
```

And use them as such in your components

```JSX
import styledProps from '@fristys/styled-props-simplified';

const Component = styled.div`
 background: ${styledProps(colors)};
`;

<Component primary></Component>
<Component secondary></Component>
<Component ternary></Component>
```

## Use with themes

You can also use `styled-props-simplified` directly with your [styled-components theme](https://www.styled-components.com/docs/advanced#theming), simply import `styledThemeProps` instead of `styledProps` and reference the key of your styles hashmap inside your theme object

```JSX
import { styledThemeProps } from '@fristys/styled-props-simplified';

const theme = {
  colors: { primary: 'pink', secondary: 'blue', ternary: 'yellow' }
};

// This will match prop values with the hashmap props.theme.colors
const Component = styled.div`
 background: ${styledThemeProps('colors')};
`;

<Component primary></Component>
<Component secondary></Component>
<Component ternary></Component>
```

## Default/Fallback values

You can use `defaultProps` to set default/fallback values for your styles in conjunction with `styled-props-simplified`

```JSX
import styledProps from '@fristys/styled-props-simplified';

const colors = { primary: 'pink', secondary: 'blue', ternary: 'yellow' };

// We're telling styledProps to get our fallback key from props.background
const Component = styled.div`
 background: ${styledProps(colors, 'background')};
`;

Component.defaultProps = {
  // colors.secondary will be used as a fallback value if there are no matches
  background: 'secondary'
};

<Component primary></Component>
<Component></Component>
```

## Mapping

Sometimes you can have a component full of all sorts of styles. For convenience `styled-props-simplified` provides a method that handles this scenario

```JSX
import { styledMappedProps } from '@fristys/styled-props-simplified';

const styles = {
  fontSizes: { heading: '2.5rem', subheading: '1.5rem', normal: '1rem' },
  colors: { primary: 'pink', secondary: 'blue', ternary: 'yellow' }
};

/**
 * Essentially, this is the equivalent to:
 *
 * const mapped = {
 *  colors: styledProps(styles.colors),
 *  fontSizes: styledProps(styles.fontSizes)
 * };
 */
const mapped = styledMappedProps(styles);

const Component = styled.div`
 background: ${mapped.colors};
 font-size: ${mapped.fontSizes};
`;

<Component primary heading></Component>
<Component secondary subheading></Component>
<Component ternary normal></Component>
```

## Mapping with themes

Mapping works exactly the same way with themes as it does without them, with the exception that you pass the string key inside your theme object instead of an actual object

```JSX
/**
 * This is also a valid import
 * import { styledMappedProps } from '@fristys/styled-props-simplified';
 */
import { styledMappedThemeProps } from '@fristys/styled-props-simplified';

const styles = {
  fontSizes: { heading: '2.5rem', subheading: '1.5rem', normal: '1rem' },
  colors: { primary: 'pink', secondary: 'blue', ternary: 'yellow' }
};

/**
 * Essentially, this is the equivalent to:
 *
 * const mapped = {
 *  colors: styledThemeProps(styles.colors),
 *  fontSizes: styledThemeProps(styles.fontSizes)
 * };
 */
const mapped = styledMappedThemeProps(styles);

const Component = styled.div`
 background: ${mapped.colors};
 font-size: ${mapped.fontSizes};
`;

<Component primary heading></Component>
<Component secondary subheading></Component>
<Component ternary normal></Component>
```

## Contributing

All sorts of contributions and suggestions are welcome in this mini project. Feel free to open an issue or create a pull request at any time.
