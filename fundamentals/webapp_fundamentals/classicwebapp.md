# Functionality of a classic web app...

...by the example of posting a new item to a server-stored json-parsed list.

The imaginary site is called `somesite.com` and the rendered list is accesible by `somesite.com/list`. New list items can be sent to the server by an `new_item` HTML POST form.

## Schema

1. User writes some data into the form's input field and submits it

2. Browser (client) sends HTTP request to server:

```py
HTTP POST https://somesite.com/new_item
```

3. Server creates a object containing the data sent by the POST request and adds it to the list JSON

4. Server answers to client by sending an http request:

```py
HTTP 302 redirect to /list # Redirecting the client to the page
```

5. Client follows redirect to get html, css and js via HTTP

```py
HTTP GET https://somesite.com/list      # HTML
HTTP GET https://somesite.com/main.css  # CSS
HTTP GET https://somesite.com/main.js   # JS
```

6. Server answers by sending the requested files

7. Client executes the given `main.js` code that requests the list json via HTTP:

```py
HTTP GET https://soemsite.com/list.json # JSON containing list items
```

8. Server responds to request by sending the json:

```JSON
[
    { content: "Some item", date: "2020-04-23" },
    { content: "Another item", date: "2020-05-02" },
     ...
]
```

9. Client executes the js event handler that renders the json to display as list
