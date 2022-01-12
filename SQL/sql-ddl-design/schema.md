# PART 1 : SCHEMA DESIGN 

## The Medical Center

*Design the schema for a medical center.*

- A medical center employs several doctors
- A doctors can see many patients
- A patient can be seen by many doctors
- During a visit, a patient may be diagnosed to have one or more diseases.

![Medical Center Diagram](/SQL/sql-ddl-design/medical_center.jpg)

## Craigslist
*Design a schema for Craigslist!*

- The region of the craigslist post (San Francisco, Atlanta, Seattle, etc)
- Users and preferred region
- Posts: contains title, text, the user who has posted, the location of the posting, the region of the posting
- Categories that each post belongs to

![Craigslist Diagram](/SQL/sql-ddl-design/craigslist.jpg)

## Soccer League
*Design a schema for a simple sports league.*

- All of the teams in the league
- All of the goals scored by every player for each game
- All of the players in the league and their corresponding teams
- All of the referees who have been part of each game
- All of the matches played between teams
- All of the start and end dates for season that a league has
- The standings/rankings of each team in the league (This doesn’t have to be its own table if the data can be captured somehow).

![Soccer League Diagram](/SQL/sql-ddl-design/soccerleague.jpg)