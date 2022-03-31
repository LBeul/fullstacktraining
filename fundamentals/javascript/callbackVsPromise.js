// Before the promises were introduced, js was prone to the callback hell
// endless nested function calls that are hard to read & write

// This simply calls a function if the preceding function was successfull
retrieveTweets("twitter/userA", (error, userATweets) => {
  displayTweets(userATweets)
  retrieveTweets("twitter/userB", (error, userBTweets) => {
    displayTweets(userBTweets)
    retrieveTweets("twitter/userC", (error, userCTweets) => {
      displayTweets(userCTweets)
    })
  })
})

// The same code using callbacks would look like this:
retrieveTweets("twitter/userA")
  .then(() => retrieveTweets("twitter/userB"))
  .then(() => retrieveTweets("twitter/userC"))
