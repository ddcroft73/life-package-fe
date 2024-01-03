The line `return <Navigate to="/login" replace />;` in the `ProtectedRoute` component does initiate a redirection to the `/login` page when a user is not authenticated. However, the current setup doesn't automatically redirect the user back to their originally intended destination (like the admin page) after they log in. To achieve this, you would need to implement additional logic to save the user's intended destination and redirect them back after successful authentication.

Here's how you can modify the `ProtectedRoute` and your login logic to support this:

### Step 1: Modify ProtectedRoute to Save the Current Location

You need to modify the `ProtectedRoute` component to pass the current location to the `/login` route so that you can redirect back to it after successful login.

```javascript
// ProtectedRoute.js
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

const isAuthenticated = () => {
  // Replace with your authentication logic
  const token = sessionStorage.getItem('jwtToken');
  return token != null;
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
```

### Step 2: Handle the Redirect After Login

In your login component, after a successful login, you should check if the `state` prop has the `from` location. If it does, redirect the user to that location. Otherwise, redirect them to a default route (like the home page).

```javascript
// Login.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (event) => {
    event.preventDefault();
    // Perform login logic here
    // ...

    // Redirect to the from page or default page
    navigate(from);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        {/* Login form fields */}
        {/* ... */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
```

With these changes, when a user tries to access a protected route and is redirected to the login page, the path they were trying to access is saved. After logging in, they are automatically redirected to that saved path, enhancing the user experience by taking them directly to the content they initially sought.
