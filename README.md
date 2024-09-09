
# SetTracker

SetTracker is a full-stack application designed specifically for strength training enthusiasts. It facilitates the tracking of individual training sets and the grouping of exercises into customized workout sessions.

- **Frontend Repository**: Contains all code related to the user interface and client-side logic.
  - [Frontend Repository Link](https://github.com/shanehowe/WorkoutTracker-ReactNative)
- **Backend Repository**: Houses the server-side code, including API services, database management, and server logic.
  - [Backend Repository Link](https://github.com/shanehowe/SetTracker-Backend)

## Problem Statement
Traditional strength training progress is often tracked using a physical journal, which can become cumbersome and inefficient. For instance, if you're doing bench presses regularly, you have to manually flip through pages to find previous records, which is time-consuming. SetTracker eliminates this hassle by digitalizing the tracking process, enabling users to effortlessly access historical data, search for specific exercises, and manage workouts with date and timestamp functionalities.

## Technologies Used
**Frontend**
- **React Native**: A framework for building native apps using React.
- **TanStack Query (React Query)**: Asynchronous state management library
- **Axios**: Promise-based HTTP client for making requests to the backend server.
- **React Native Paper**: Collection of customizable and production-ready components for React Native

**Backend**
- **FastAPI**: Modern web framework for building APIs with Python.
- **Azure Function App**: Serverless computing service offered by Azure
- **CosmosDB**: Fully managed NoSQL, relational, and vector database.

## Repository Structure

This repository serves as a hub linking to the separate frontend and backend repositories for the SetTracker application. Here's how the project is organized:

- **Frontend Repository**: Contains all code related to the user interface and client-side logic.
  - [Frontend Repository Link](https://github.com/shanehowe/WorkoutTracker-ReactNative)
- **Backend Repository**: Houses the server-side code, including API services, database management, and server logic.
  - [Backend Repository Link](https://github.com/shanehowe/SetTracker-Backend)

Each sub-repository includes detailed instructions on setting up and running the respective parts of the application. Please refer to each repository for specific setup and installation guides.

## App Demo  
This is a basic demo of some features in the app.

**Creating a workout folder**  
Workout Folders allow users to group exercises together into one workout. Take for example a folder called "Legs", you could have all leg related exercises in there. They allow you to build structure around you workouts.
<video width="630" height="300" src="https://github.com/shanehowe/SetTracker/assets/104032580/13974a31-f970-4f7b-95d0-4faafb272af9"></video>
**Renaming/Adding exercises/Deleting a workout folder**  
When navigating to our created workout folder, users can add/remove exercises as they see fit, rename folders, and delete the folder if they please.
<video width="630" height="300" src="https://github.com/shanehowe/SetTracker/assets/104032580/dd7e66c8-bba4-455d-a4ce-89ebef46ed7e"></video>

**Tracking strength training sets**  
Tracking sets is the main focus of the app. The app groups sets by the date they were performed, allowing users to view their workout history in an intuitive, chronological order. For each exercise, such as '3 sets of 10 reps at 50KG,' users can quickly log the number of reps and weight. A swipe-left feature allows users to effortlessly repeat sets, minimizing the time spent entering data
<video width="630" height="300" src="https://github.com/shanehowe/SetTracker/assets/104032580/02ac3737-3674-4bbb-a177-d32038179304"></video>

**Changing app appearance**
<video width="630" height="300" src="https://github.com/shanehowe/SetTracker/assets/104032580/8eac18ae-c0a9-4178-b947-51f60b797f92"></video>

**Adding custom exercise**  
Pre loaded on the app their is a lot of exercises to choose from, however there still may be an exercise a user wants to track that is not available. No fear, users cans search for the exercise and if no results or found they are greeted with a dialog asking them if they want to create a new exercise. This exercise is then linked to the user it will not be pushed out across the app. This is so other users arent bombarded with exercises that may be of new use to them.

## Possible Future Additions
**Add sets for a custom time and date** Currently time and date of each set is generated and saved on the server as UTC timestamps as soon as they arrive their. This feature would allow users to add sets they might have done the day before but forgot. The challenge updating the add set interface to still be effecient and not be cluttered. Adding sets should not be time consuming as typically you would only be resting for 90 seconds between sets and you dont want to spend that time filling out forms on an app.  

**View Set History as a Graph** This feature would allow users to visualize their progress on a certain lift over a time period on a graph.
