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

- Fix Logout route

### Step Three [x]

- Fix User Profile

###
        