# MVP List

Pentacle, a mail list wrapper designed to hold email clients, tied to specific users and integrating with SES to send emails.

## 1. New account creation, log in, log out, and guest/demo login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Users can't use certain features without logging in (Such as email compose and Client lists).
* Logged in users are directed to their profile page which displays their Uploaded Mail and Clients.
* Logged out users are directed to a page explaining the features of Pentacle.

## 2. ClientList (Full Crud)

* Logged in users can add clients to their mail list.
* Logged in users can edit and delete their client lists.
* Logged in users can only see their client List

## 3. Emails (Partial Crud)

* Logged in users can post emails and info such as images.
* Logged in users can edit and delete their saved emails.
* Completed email jobs will be added to previous email tables.


## 5. Groups (Full Crud)

* Users can create groups
* Users can delete their groups
* users can update groups
* Users can add contacts to groups

## 5. Bonus Features

* The ability to compose emails within the App

## Database Schema
https://dbdiagram.io/d/64e6b83402bd1c4a5e4de3ae
