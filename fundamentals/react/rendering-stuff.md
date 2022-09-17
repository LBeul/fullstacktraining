# Rendering

## Always return single elements

JSX returned from a Component has to be wrapped inside a single tag. It's **not possible** to return multiple jsx elements:

```jsx
// Will work as it returns a single jsx element
const Header = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>bla bla</p>
    </div>
  )
}

// Will crash as it doesn't return a single jsx element
const App = () => {
  return (
    <Header />
    <Content />
    <p>bla bla</p>
  )
}
```

If you want to avoid using `div`s as wrapper elements, you can go with the _diamond_ or _fragment_:

```jsx
// <></> wraps other jsx elements without
// destroying your site's semantics
const Content = () => {
  return (
    <>
      <p>bla bla</p>
      <p>42 42 42</p>
    </>
  );
};
```

## Render Collections using `map()`

When rendering collections - e.g. by calling `.map()` on an array of content, React will inform you (via agressive logging) that each items needs to have a specific key property. Those key strings' purpose is to give each rendered element a stable identity - therefore React's virtual DOM is able to save lots of time performing rendering operations.

```jsx
const NumberList = ({ numbers }) => {
  const listItems = numbers.map((number) => (
    <ListItem value={number} key={number.toString()} />
  ));
  return <ul>{listItems}</ul>;
};
```

When working with arrays, one my be tempted to simply plug in an elements array-index as key. This is a very bad idea as it may crash the whole app if the original array ordering changes. So just never do it.
