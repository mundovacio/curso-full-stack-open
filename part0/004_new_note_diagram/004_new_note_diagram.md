# 0.4: New note diagram

Diagram depicting the situation where the user creates a new note on the [page](https://studies.cs.helsinki.fi/exampleapp/notes) by writing something into the text field and clicking the Save button.

```mermaid

sequenceDiagram
    participant user
    participant browser

    activate user
    user->>browser: Type something in the form input field "hello world"
    user->>browser: Click Save button
    deactivate user
    activate browser
    Note left of browser: On form submitted, the form data is sent to action attribute
    Note left of browser: The default behavior of most browsers on submit is to be refreshed
    deactivate browser
```

```mermaid
sequenceDiagram
    participant browser
    participant server

    activate browser
    Note right of browser: Sending FormData on submit
    browser-->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    deactivate browser
    activate server
    Note left of server: Update JSON on the server:
    Note left of server: request.body.note // "hello world"
    Note left of server: {content: request.body.note, date: new Date()}
    Note left of server: Server redirects to /notes
    deactivate server
```
