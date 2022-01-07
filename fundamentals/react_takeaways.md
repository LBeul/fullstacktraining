# Thins special to JS

## Logging objects

When logging objects (or functions, which are js objects as well), don't do it _the java way_ (concatenating with `+`) but separate with commas:

```js
let someObj = {
  name: "Peter",
  age: 12,
}

console.log("Contains: ", someObj) // Will return "Contains:  Object { name: "Peter", age: 12 }"
console.log("Contains: " + someObj) // Will return "Contains: [object Object]"
```

# Things special to React

## Rendering

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

If you want to avoid using `div`s as wrapper elements, you can go with the _"diamond"_:

```jsx
// < > wraps other jsx elements without
// destroying your site's semantics
const Content = () => {
  return (
    <>
      <p>bla bla</p>
      <p>42 42 42</p>
    </>
  )
}
```

## Event Handlers

In React, event handlers are supposed to be either _functions or function references_.
It's **not possible** to pass function calls as event handler properties:

```jsx
// Function as property --> Will work!
<button onClick={() => setCounter(counter + 1)}>
  plus
</button>

// Function expression as prop --> Will work as well.
<button onClick={handleClick}>
  plus
</button>

// Function call as prop --> Will not work!
<button onClick={setCounter(counter + 1)}>
  plus
</button>
```

Sometimes, you may need to pass a property to a function executed by an event handler. If the function is defined inside of the `onClick` property, this should be an easy task - just integrate it. However, a lot of times you keep the handler functions separated and pass them as references, like `onClick={clickHandler}`. As function calls inside of event handlers are illegal, you have to solve that problem by calling a function that returns a function. Sounds complicated, heh? Be sure, it's easier than it sounds:

```jsx
const greet = (name) => {
  const hello = () => {
    console.log(`Hello, ${name}!`)
  }
  return hello
}

// Calling greet("John") returns the function
// expression hello with the paramater "john"
// So, althouigh we are passing a function call,
// the handler receives a valid function expression
return (
  <div>
    <button onClick={greet("John")}>button</button>
  </div>
)
```

Another thing concerning event handlers is the so-called _default behaviour_ triggered by certain events. For example, a submit-type button that's part of an html form fires an `submit` on click by default. This can lead to unexpected behaviour - e.g. a hard reload of the current website. You can prevent that default behaviour by passing the `event.preventDefault()` call to the event handler:

```jsx
const InputThingy = () => {
  const addItem = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
  }
  return (
    <form onSubmit={addItem}>
      <input />
      <button type="submit">save</button>
    </form>
  )
}
```

## Mutating state

A component's state should never be altered directly - that's what the setState hook was inventend for. Mutating the state directly can result in unexpected behaviour and side effects.

However, this leads to special tretaments when dealing with a complicated state - e.g. a state of type object. That's where the **spread operator** `...` comes in handy:

```jsx
// Complex state consisting of multiple member vars
const [clicks, setClicks] = useState({
  left: 0,
  right: 0,
})

// Direct mutation --> FORBIDDEN
const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
}

// Unnecessarily long & hard-to-read state mutation
const handleRightClick = () => {
  const newClicks = {
    left: clicks.left,
    right: clicks.right + 1,
  }
  setClicks(newClicks)
}

// State mutation made easy using the spread operator
const handleLeftClick = () => {
  setClicks({ ...clicks, left: clicks.left + 1 })
  // Copies the whole 'clicks' objects and changes the 'left' prop
}
```

## Hooks

Hook-defining functions(like `useEffect` or `useState`) have to be called from the body of a functional react component. Calling them from inside of loops or conditionals is forbidden and will crash your app.

```jsx
const App = () => {
  // Perfectly fine
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // FORBIDDEN
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // FORBIDDEN
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // FORBIDDEN
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```
