# About

Restyler — is a general purpose design system for React. It was designed to be simple and responsive while preserving flexibility and ease of code writing. Restyler is distributed via the [npm package](https://www.npmjs.com/restyler) and its code is hosted on [GitHub](https://github.com/albnnc/restyler). We also host [storybook](https://albnnc.github.io/restyler) that contains various component demos and documentation.

The main idea of this library is, perhaps, not a new concept of style props, which are implemented by means of CSS-in-JS. However, one notable thing is that one can use whichever CSS-in-JS framework is wanted: Restyler is style-framework agnostic.

# Installation

Installation is easy and common:

```sh
npm install --save restyler
```

After Restyler is installed, one needs to provide it the style adapter. The following code sample demonstrates [emotion](https://emotion.sh) integration:

```jsx
const styledAdapter = styled: (tag, fn) =>
  styled(tag, {
    shouldForwardProp: prop => isPropValid(prop) && !isStyleProp(prop)
  })(fn);

export default App = () => {
  return (
    <SystemContainer styled={styledAdapter}>{/* ... */}</SystemContainer>
  );
};
```

# Core Concepts

As was said above, one of the main ideas of Restyler is the usage of so called style props. Style Props used by Restyler _differ from the similar ones from [System UI](https://system-ui.com)_ and look as follows:

```ts
export interface BasicStyleProps {
  align?: Align;
  background?: Background;
  border?: Border;
  color?: Color;
  direction?: Direction;
  elevation?: Elevation;
  flex?: Flex;
  font?: Font;
  gap?: Gap;
  justify?: Font;
  margin?: Margin;
  padding?: Padding;
  radius?: Radius;
  weight?: Weight;
  wrap?: Wrap;
}
```

You can read more about them [here](https://github.com/albnnc/restyler/blob/master/src/models/StyleProps.tsx). This means that any of the listed props might be used on every single component exported by this library:

```jsx
<Button
  margin="medium"
  background="primary"
  // ...
>
  Click Me
</Button>
```
