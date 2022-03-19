# ChatApp

## Overview

ChatApp as the name suggest is a chat app for mobile devices which is developed using React Native.

## Key Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.

- A page displaying the conversation, as well as an input field and submit button.

- The chat provides users with communication features such as : sending images and location data.

- Data gets stored online and offline.

## Tech Stack

- React Native

- Expo

- Gifted Chat library

- Google Firebase/Firestore

## How to run the application

- Clone this repository

- Use npm install or yarn install to install the dependencies using the terminal

- After creating a Firabase account and got your database configuration credentials go to ./components/Chat.js and replace the firebaseConfig with your credentials , except the apiKey [ in the next step you'll be replacing that too]

- In the root folder create .env file, then inside create API_KEY="and paste your key here" -

  - exapmle:

  .env

  ```bash

   API_KEY="ZEFzaSyCYhM7WSfdFSxzpcepyID3B5w1sfuE"

  ```

- Using the terminal type: expo start to run the application

- open the expo app on your android phone and scann the QR-Code / or send a link via email for iOS to connect to expo
