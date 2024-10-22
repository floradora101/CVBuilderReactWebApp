# CV Builder App

A web-based CV builder application made with **React.js** on the frontend and **Node.js** with **PostgreSQL** for the backend. It allows users to create, customize, and download CVs easily.


## Features
- Create a personalized CV with a user-friendly interface.
- Multiple CV templates designed with **Bootstrap**.
- Save, edit, and download CVs in PDF format.
- User authentication and data management with PostgreSQL.

## Technologies Used
- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (with **pgAdmin** for database management)

## Installation and Setup

### Prerequisites
1. **Node.js**: Ensure you have Node.js installed. [Download here](https://nodejs.org/).
2. **PostgreSQL**: Install PostgreSQL and **pgAdmin** to manage the database. [Download here](https://www.postgresql.org/download/).

### Backend Setup
1. Clone the repository:
   git clone https://github.com/yourusername/cv-builder-app.git
   cd cv-builder/server
   npm install
2. Clone the repository:
   in config.json:
     "development": {
    "username": "postgres",
    "password":your_db_password
    "database": your_db_name,
    "host": "localhost",
    "dialect": "postgres"
  },
  3. Run database migrations: npx sequelize-cli db:migrate
  4. npm start

  ### Frontend Setup
  1. cd client
  2. npm install
  3. npm start

