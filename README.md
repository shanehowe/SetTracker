# Set Tracker

Set Tracker is a self-built application that I built to help track my strength training progress in the gym. It leverages the Next.js framework, PostgreSQL database with Prisma ORM, and is written in TypeScript.

## The Problem it Solves

Prior to using Set Tracker, I was relying on my notes app or pen and paper to track my strength training sets. However, this manual process was cumbersome and time-consuming. I needed a more efficient and streamlined solution that focused solely on set tracking, without the need for unnecessary features or complicated interfaces.

Set Tracker solves this problem by providing a dedicated app specifically designed for tracking sets during strength training sessions. It offers a simple interface that allows me to quickly record my sets. With Set Tracker, I no longer have to juggle between multiple tools or rely pen and paper methods.

By using this app, I can now focus more on my workouts, easily monitor my progress over time, and make data-driven decisions to improve my training routine.

## Features

- **Track Sets:** Easily record and track your strength training sets, including exercises, weights, repetitions, and notes.
- **Exercise Management:** Manage your exercises by adding, editing, and deleting them as needed.
- **User Authentication:** Securely register and authenticate users to ensure their data is private and accessible only to them.

## Deployed App

Access the deployed Set Tracker application at [https://set-tracker.vercel.app](https://set-tracker.vercel.app).

## Technologies Used

- **Next.js:** A React framework for building server-rendered applications.
- **PostgreSQL:** A powerful open-source relational database management system.
- **Prisma:** An open-source database toolkit that provides an auto-generated and type-safe query builder.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

## Folder Structure

The project structure is organized as follows:

- `app/`: Contains the Next.js pages that represent the different routes of the application.
- `app/api`: Contains API-related files and configurations.
- `components/`: Reusable React components used throughout the application.
- `prisma/`: Prisma configuration and database schema files.
- `lib/`: Utility functions and helpers.
- `services/`: Functions used in frontend for interacting with backend API

## The Not So Good
- Since at the time of this project the app router was fairly new meaning there wasnt a whole pile of info out there on using it which meant running into problems took a lot of debugging.
- All components in the component library I used could not be server side rendered as they needed useState(). Meaning for my 'pages' to be able to use metadata i.e page title etc. I ended up just creating components where their whole purpose was to render everything on the page client side. You'll see in components some are named SomethingPage where all the page functions and components are rendered. Of course there is ways around this probably through better planning and more experience with using Nextjs.
- Not only was this my first time using Nextjs but also my first time using TypeScript. So in some cases particularely in the api/ folder you'll see types above a route specific to that route like the request body. Maybe I could of created a types file to handle this and have better naming conventions. All to be improved on in the future.

Over all considering this was my first time using Nextjs I am happy with how it turned out and I learnt loads. The result? A fully functional full stack application that alows me to track my sets in the gym instead of the notes app on my phone. 

