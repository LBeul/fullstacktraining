# Functionality of a simple SPA...

...by the example of posting a new item to a server-stored json-parsed list.

The imaginary site is called `someapp.com` and the rendered list is accesible by `someapp.com/list`. New list items can be sent to the server using AJAX.

1. User writes some data into the form's input field and submits it

2. Client automatically generates timestamp, packs input & timestamp as object and pushes it to the notes array:

```js
let form = document.getElementById("list_form");
form.onsubmit = function (e) {
  e.preventDefault();

  let item = {
    content: e.target.elements[0].value,
    date: new Date(),
  };

  list.push(item);
  e.target.elements[0].value = "";
  redrawNotes();
  sendToServer(item);
};
```

3. At the same time, the Client sends the generated object the server-stored json:

```py
HTTP POST https://soemapp.com/new_item # Posts item to json
```

3. Server parses the data as described in the POST request's header and responds to client.

```py
HTTP 201 "created" # Signals success to the client
```

4. Browser executes the event handler that renders notes to display

5. Reloading the site is not necessary
