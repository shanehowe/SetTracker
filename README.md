# Set Tracker

Set Tracker is a self-built application that I built to help track my strength training progress in the gym. It leverages the Next.js framework, PostgreSQL database with Prisma ORM, and is written in TypeScript.

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
