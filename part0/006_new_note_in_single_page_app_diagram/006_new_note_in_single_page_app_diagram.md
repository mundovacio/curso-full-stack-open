# 0.6: New note in Single page app diagram

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid

sequenceDiagram
    participant user
    participant browser

    activate user
    user->>browser: Type something in the form input field "hello world"
    user->>browser: Click Save button
    deactivate user
    activate browser
    Note left of browser: On form submitted:
    Note left of browser: Prevent the default behavior
    Note left of browser: Create a new note with the input.value
    Note left of browser: The list is updated with the new note
    deactivate browser
```

```mermaid
sequenceDiagram
    participant browser
    participant server

    activate browser
    Note right of browser: Sending the new note payload:
    Note right of browser: {content: "hello world", date: new Date()}
    browser-->>server:  POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    deactivate browser
    activate server
    Note left of server: Update JSON on the server side by pushing the new note
    server-->>browser: Confirmation of new note created: {message: "note created"}
    deactivate server
    
```
