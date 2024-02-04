## Node JS & Express & Mongo Review Core concepts and build core features which all applications need

1. Explore `path`, `__dirname`

2. Read and Write files with `fs` `stream`

3. Explore NPM packages

4. Build a Event Emitter (event logger)

5. Build Web Server with Pure Node JS (No Express)

6. Using ExpressJS to build a web server

7. ExpressJS Middleware
   There are 3 types of middleware

- BUILT-IN middleware
- CUSTOM middleware (we build ourself)
- Middleware from 3rd party libraries

* `app.use` - for middleware, does not accept regex in the `path` in the past, now it's already supported with new version.
* `app.all` - does accept regex in the `path`, for handle all route

8. Routing

9. MVC REST APi

10. Authentication
    Requires 2 routes

    - One for registration
    - One for authorize the user after user created an account

11. JWT Auth

- Access Token = Short Time (usually 5 to 10m)
- Refresh Token = Long Time (a day or even days)

* Best practice for FE applications to store them in memory
  will be lost when the app closed
  Do NOT store in local storage or even cookie

* Refresh Token

  - sent as httpOnly cookie
  - Not accesible via JS
  - Must have expiry at some point
  - Issued at Authorization
  - Client uses to request new Access Token
  - Verified with enpoint & DB
  - Must be allowed to expire or logout

* Access Token

  - issued at authorization
  - Client uses for API Access until expires
  - Verified with Middleware
  - New Token issued at Refresh request
