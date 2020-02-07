# Message Board API Documentation
By passing the use's name, email, and message, the Message Board API generates welcome messages and
lists the message cards with user's name, email, and message information onto the website.

## Get the name of the user and welcome the user
**Request Format:** /name/:name

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Pass the name as a param and request for a welcome message. As in: Welcome, name!
Please leave your message below and we'll get back to you ASAP! (return a ling of html text)

**Example Request:** /name/Jenny

**Example Response:**

```
Welcome, Jenny! Please leave your message below and we'll get back to you ASAP!
```

**Error Handling:** If the name is empty, the page will generate the error "Error: name can't be
empty!"

## Get information for the message cards
**Request Format:** /info/:name/:message/:email

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Pass the name, message, and email as params to request a message card to show on
the website. The message card with include all the information being passed as params. return a
JSON format of all the information.

**Example Request:** /info/name/message/email

name = Jenny

message = Nice to meet you!

email = rong@uw.edu

**Example Response:**

```json
{
  "name": "Jenny",
  "message": "Nice to meet you!",
  "email": "rong@uw.edu"
}
```

**Error Handling:** If any of the name, email, or message is empty, the page will generate the
error "Error: missing name, email or message."
