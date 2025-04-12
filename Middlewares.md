Middleware in Web Development

Middleware functions are a fundamental part of request-response cycle management in web frameworks (like Express.js in Node.js). They provide a mechanism to intercept, modify, or conditionally respond to HTTP requests before they reach the final route handler or before the response is sent back to the client.

These functions have access to the request (req), response (res), and the next middleware in the chain. Middleware is commonly used for:

1. Authentication and Authorization
   - Example: Allow access to a route only if the user is logged in.
     ```js
     function isAuthenticated(req, res, next) {
       if (req.user) {
         next(); // user is authenticated, proceed
       } else {
         res.status(401).send('Unauthorized');
       }
     }
     ```

2. Role-Based Access Control (RBAC)
   - Example: Provide different responses or route access based on user roles such as "admin", "editor", or "viewer".
     ```js
     function isAdmin(req, res, next) {
       if (req.user && req.user.role === 'admin') {
         next(); // user is admin, proceed
       } else {
         res.status(403).send('Forbidden: Admins only');
       }
     }
     ```

Middleware can be applied globally (for all routes) or locally (for specific routes) and are essential for implementing modular, scalable, and secure backend applications.
