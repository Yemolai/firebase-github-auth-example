# Firebase-Github OAuth Example #

This is a very simple Express/HTML5 project to demonstrate how to connect Firebase Authentication with Github OAuth and present the signed-in user Profile data.

## How to set it up

To run it you'll need a Google Firebase account with an active project and the Github OAuth integration activated and properly setup.

  1. Go into Github in the `Settings / Developer Settings / OAuth Apps` to create a new OAuth App

  a. The field `Homepage URL` can be `http://localhost:3000` for now

  b. Field `Authorization callback URL` can be anything for now (it will come from setting up the Firebase project)

  c. Click in `Generate a new client secret`, leave it open and go to Firebase, the created hash is the secret and will show up just once (you can create other secrets and remove these previously created)

  2. Go into Firebase to create a project

  a. Create a new Firebase project and copy the config object to a safe spot

  b. Go into the project and open the `Authentication section`

  c. In the `Sign-in method` select Github, fill the `Client ID` and `Client secret` from the previously created OAuth app (in `1.c`)

  d. Copy the URL presented after the fields ending in `__/auth/handler` and save it in the `Authorization callback URL` in the Github OAuth App (in `1.b`)

  3. Get the Firebase project config into the env

  a. Get the Firebase project config object that is presented in the setup `2.a` (if you missed it, go into the Firebase project settings, in the bottom of the first tab it should show you this JSON object)

  b. Make it a one line it, can be done using `var firebaseConfigObject = { ... }; JSON.stringify(firebaseConfigObject)` in a browser console or terminal running node to pass the object and get a one-liner of the config object

  c. Add that value in a newly .env file in the root of this app directory copied from `.env.EXAMPLE` if you don't have one already created, after the `FIREBASE_CONFIG=` key

With all setup, install the dependencies once:

```bash
$ npm install
```

## How to run

To run the application itself run:

```bash
$ npm run dev
```

# Considerations

This is not an application intended to run in a prod environment, this is a proof-of-concept to help understand a simple OAuth flow for Authentication using Firebase. DO NOT USE THIS DIRECTLY IN PROD.

This is a very old project, this implementation cannot be representative of good development practices, it is not intended to be depended on beyond object of academic study and learning.