# Restyler 🎨

Restyler is a general purpose design system for React. It was designed to be simple and responsive while preserving flexibility and ease of code writing. Restyler is distributed via the [npm package](https://www.npmjs.com/restyler) and its code is hosted on [GitHub](https://github.com/albnnc/restyler). We also host [storybook](https://albnnc.github.io/restyler) that contains various component demos and documentation.

# Installation

Installation is easy and common:

```sh
npm install --save restyler
```

After Restyler is installed, one needs to provide it the style adapter. The following code sample demonstrates [emotion](https://emotion.sh) integration:

```jsx
const styledAdapter = (tag, fn) => styled(tag)(fn);

export default App = () => {
  return <SystemContainer styled={styledAdapter}>{/* ... */}</SystemContainer>;
};
```

If you'd like to use, for example, [theme-ui](https://theme-ui.com/) that doesn't provide a `styled` function by itself, you can do the following:

```jsx
const styledAdapter = (Tag, fn) =>
  forwardRef((props, ref) => {
    const { theme, kind, ...rest } = props;
    const validProps = Object.keys(rest).reduce(
      (p, k) => (isPropValid(k) ? { ...p, [k]: rest[k] } : p),
      { sx: fn(props) }
    );
    return <Tag ref={ref} {...validProps} />;
  });

export default App = () => {
  return <SystemContainer styled={styledAdapter}>{/* ... */}</SystemContainer>;
};
```
