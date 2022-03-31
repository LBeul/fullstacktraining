# Event Handlers

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
