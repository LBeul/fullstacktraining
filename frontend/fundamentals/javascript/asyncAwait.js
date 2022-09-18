// Async/Await is just syntactic sugar for promises

// promise example:
movePlayer(100, "left")
  .then(() => movePlayer(200, "right"))
  .then(() => movePlayer(20, "left"))
  .then(() => movePlayer(500, "right"))

// The same in async/await:
async function play() {
  const first = await movePlayer(100, "left") // pause
  await movePlayer(200, "right") // pause
  await movePlayer(20, "left") // pause
  await movePlayer(500, "right") // pause
}

// a more realistic example:
const fetchAndLogData = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
}
fetchAndLogData("https://jsonplaceholder.typicode.com/users")

const getMultipleData = async (urls) => {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    )
    console.log(users)
    console.log(posts)
    comnsole.log(albums)
  } catch (error) {
    console.error("Oooopsie", error)
  }
}
