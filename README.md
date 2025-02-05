[![Netlify Status](https://api.netlify.com/api/v1/badges/8a0a253c-0b82-41ee-9650-a70171405b74/deploy-status)](https://app.netlify.com/sites/startling-biscuit-830178/deploys)

# #VanLife Scrimba Project

## Description

Van life project based on [This figma design](https://www.figma.com/file/igDA2NiMDhoaIIAqm5EnTq/%23VanLife?node-id=0%3A1) from [Scrimba](https://scrimba.com/)

This project is a detailed example for learning react-router-dom and using basic and intermediate react concepts to create smooth transitions and a good user experience.

## Features

- Built with React and [React-Router-Dom](https://reactrouter.com/start/library/installation) from Redux

- Utilizes [Firebase](https://firebase.google.com/) for basic email authentication and data storage

- Utilizes vite's [CSS Modules](https://vite.dev/guide/features#css-modules) functionality for more encapsulation and organization of CSS

- Continuous Deployment with netlify

## Installation

```
clone the repository
npm install
npm run dev to run a dev server
npm run preview for a preview build
npm run deploy to create a distributable client side application (found in the dist/ folder)
```

## Usage

The Host link at the top header nav-bar will get you in to the hosts pages.

Login information to show off example users:

User with data:

```
Username: b@b.com
Password: p12345678
```

User without data:

```
Username: b2@b.com
Password: p654321
```

There are several "unimplemented" features that would require data persistence updating or creating which was out of the scope of this project currently. These have been marked with popups to make it clear.

## Learning objectives

- Understand React routers and their place in the React client-side ecosystem
- Practice creating components from complex figma diagrams
- Practice with basic authentication and data persistence
- Try out new methods of organizing CSS (CSS-Modules using PostCSS)
- Try out various other react features (Such as portals for modal pop-ups)

## Challenges

CSS organization quickly became impossible in a single file, even in a project that barely scrapes past a "small project". My solution was to explore alternatives to a single css file. Vite's implementation of CSS Modules appealed to me but the implementation is mildly flawed and I needed to use [This vite plugin module](https://www.npmjs.com/package/vite-css-modules/v/1.1.0) in order to make it act correctly with typescript.

I decided to do this entire project in typescript as my first real venture in to using typescript with React. For now, using typescript is slowing me down, but I am much more confident that my code will work correctly with many less strange bugs.

## Next Steps / Future Plans

Update "placeholder" pictures in the dashboard in to real components (likely using shadcn components as they are quite complicated).

Expand data creation: Allow hosts to create vans, edit vans, etc.

Allow users to "rent vans" with their own portal page.

## Acknowledgements

[Scrimba](https://scrimba.com) For the design and their react-router-dom tutorial series.
