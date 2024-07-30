# CU Threads Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2012.18.3-brightgreen)](https://nodejs.org/)
[![React.js Version](https://img.shields.io/badge/React-%3E%3D%2016.13.1-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.2.1-blueviolet)](https://tailwindcss.com/)

CU Threads Frontend is a social media application designed to offer Reddit-like experience for students of Chandigarh University with a vision of increasing collaboration and easy access to information about  event happening in the community. The project aims to provide an interactive platform for users to create threads, posts, comments, and engage in discussions seamlessly.

## Features

- **Nested Comments:** Supports deeply nested comments similar to Reddit.
- **Responsive Design:** Built with Tailwind CSS to ensure a mobile-friendly experience.
- **Interactive UI:** Real-time updates and smooth user interactions.
- **Pagination:** Efficient handling of large datasets with server-side pagination.

## Tech Stack

- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for creating responsive designs.
- **Node.js**: Backend logic and API integration.
- **Vite**: Fast and optimized frontend build tool.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Dev-Bhandari/CU-Threads-Frontend.git
   cd CU-Threads-Frontend
   
2. **Install dependencies:**

   Use npm to install the necessary dependencies:
   ```bash
   npm install

3. **Start the development server:**
   
   Launch the development server using the following command:
   The application will be running on http://localhost:5173.
   ```bash
   npm run dev

5. **Environment Variables:**

   Create a .env file in the root directory and add the following variables:
   Replace the API_BASE_URL with your backend URL if it differs.

   ```env
   REACT_APP_API_BASE_URL=http://localhost:3000
   VITE_BASE_SOURCE_CODE=https://github.com/Dev-Bhandari/CU-Threads-Backend

6. **Usage**
   1. *Open your browser:*
       Navigate to http://localhost:5173.

   2. *Create an account:*
      Sign up with your email or log in using existing credentials.
   
   3. *Start a thread:*
      Click on 'New Thread' to create a discussion topic.

   4. *Post comments:*
      Engage with threads by posting comments or replying to others.

   5. *Explore threads:*
      Browse through various threads and participate
