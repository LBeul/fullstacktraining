// Without "For await of"
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

// now (ES9):
const getMultipleData2 = async (urls) => {
  const requests = urls.map((url) => fetch(url))
  for await (let req of requests) {
    const data = await req.json()
    console.log(data)
  }
}
