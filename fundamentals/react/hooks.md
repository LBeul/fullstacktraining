# Hooks

## Call hooks within components

Hook-defining functions(like `useEffect` or `useState`) have to be **called from the body of a functional react component**. Calling them from inside of loops or conditionals is forbidden and will crash your app.

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

### Mutate component state with `useState`

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

### Trigger side effects with `useEffect`

Functional components are usually cosidered _pure_ - i.e. not producing side effects.
However, some side effects (e.g. newtork requests) are crucial for opur application to work frictionless. This is why the `useEffect` hook was introduced. It enbales ypu tp perform side effects in functional components.

The `useEffect` function is automatically called after a component _rendered_ - i.e. after mounting or updating the component where it's located.
