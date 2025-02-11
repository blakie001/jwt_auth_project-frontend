# JWT Auth Project - Frontend

This is the frontend of the **JWT Auth Project**, built with **React.js**. It provides a user-friendly interface for login, signup, and authentication.

## Features
- **Login Screen**: 
  - Email/username and password fields.
  - "Remember Me" functionality using local storage.
  - "Forgot Password" link (basic implementation).
  - Input validation and error handling.
- **Signup Screen**:
  - Fields for username, email, password, and password confirmation.
  - Terms and conditions checkbox.
  - Input validation and success/error messages.
- **Protected Routes**: 
  - Redirects to the homepage after successful login.
  - Prevents unauthorized access to protected routes using JWT tokens.

## Technologies Used
- **React.js**: For building the user interface.
- **React Router**: For routing and navigation.
- **Axios**: For making API requests to the backend.
- **Context API**: For state management (e.g., authentication state).


## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jwt_auth_project_frontend.git

 ## Navigate to the project directory:

bash
Copy
cd jwt_auth_project_frontend

 ## Install dependencies:

bash
Copy
npm install
 ## Start the development server:

bash
Copy
npm start
 ## Open your browser and navigate to http://localhost:3000.
