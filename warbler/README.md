Welcome to Warbler! 

This is a unit project for Springboard's Software Engineering bootcamp. 

### Step One [x]

<details>
   <summary> Explore models, check routes </summary>

- Explore models.py
  -  **Follows** has a composite primary key joining the follower and followed accounts.
   - **Likes** uses two foreign keys linking a user and a message/warble they liked.
    - **User** has a half-dozen profile columns, and includes relationships to followers, following, and likes. It includes functions for self-repr and showing follower and following counts. Its methods include a hashed password signup and hashed authentication.
    - **Message** structures the messages/warbles and links each to a user id (fk) and user (relationship).
- Quick check of Routes
    - Login [x]
    - logout [ ]
      - unimplemented
    - signup [x]
    - users [x]
    - user [x]
      - links seem off
    - user/id/following [x]
    - user/id/followers [x]
    - follow [x]
    - unfollow [x]
    - profile [ ]
      - Only placeholder text?
    - edit profile [ ]
      - unimplemented
    - delete [x]
    - new msg [x]
    - msg [x]
    - msg delete [x]
    - homepage [x]

</details>

### Step Two [x]

- Fix Logout route to log users out

### Step Three [x]

- Fix User Profile to show user details

### Step Four [x]

- Fix User Cards to include user details

### Step Five [X]

- Add Profile Editing with password authentication
  - Changing profile details while authenticating a user's password was a sticking point.
  - Noticed that salting errors do not return unauthorized or invalid credentials. 

### Step Six [x]

- Fix Homepage to show only follower's messages

### Step Seven [x]

<details>

<summary>
Conceptual Questions
</summary>

  - How is logged in user tracked? | What is Flask's g object? | What is the purpose of add_user_to_g? 
    - *App.py uses `g` to invoke the global context and track the user based on the `if CURR_USER_KEY in session` by storing the user's session key within the function `add_user_to_g` as `g.user`*
  - What does `@app.before_request` mean?
    - *`@app.before_request` runs before each request made to our server. In practice this means e.g when the site is loaded or a request to a route is made, we check for a session user and then deliver either the user through `g.user` or return `None`.*
    -  
</details>
