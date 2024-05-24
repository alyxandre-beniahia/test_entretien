# Authentication App

A simple authentication app built with Node.js, Express, MongoDB React.

## Installation

Clone the repository:
git clone https://github.com/your-username/my-app.git

Navigate to the project directory:
cd my-app

Install the dependencies for the server:
cd backend
npm install

Install the dependencies for the client:
cd ../frontend
npm install

Replace <your_mongodb_uri> with the connection string for your MongoDB database, and <your_jwt_secret> with a secret key for JSON Web Token (JWT) authentication.

## Usage

Running the Application
Start the server:
cd backend
npm start

In a separate terminal, start the client:
cd frontend
npm run dev

Register a new user at /register or log in with an existing account at /login.
After successful login, you will be redirected to the profile page.
On the profile page, you can view your profile information and delete your account if desired.

License
This project is licensed under the MIT License.
