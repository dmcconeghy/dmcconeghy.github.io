-- Comments in SQL Start with dash-dash --

-- Find the app with an ID of 1880.
SELECT * FROM analytics WHERE id = 1880;
-- Find the ID and app name for all apps that were last updated on August 01, 2018.
SELECT id, app_name FROM analytics WHERE last_updated = 'August 01, 2018';
-- Count the number of apps in each category, e.g. “Family | 1972”.
SELECT category, COUNT(id) as number FROM analytics GROUP BY category;
-- Find the top 5 most-reviewed apps and the number of reviews for each.
SELECT app_name, reviews FROM analytics ORDER BY reviews DESC LIMIT 5;
-- Find the app that has the most reviews with a rating greater than equal to 4.8.
SELECT app_name, MAX(reviews), rating FROM analytics WHERE rating >= 4.8 ORDER BY reviews DESC LIMIT 1;
-- Find the average rating for each category ordered by the highest rated to lowest rated.
SELECT SUM(rating)/COUNT(id) as average, category FROM analytics GROUP BY category ORDER BY category, average DESC; 
-- Find the name, price, and rating of the most expensive app with a rating that’s less than 3.
SELECT app_name, MAX(price), rating FROM analytics WHERE rating < 3 GROUP BY app_name, rating ORDER BY price DESC LIMIT 1;
-- Find all apps with a min install not exceeding 50, that have a rating. Order your results by highest rated first.
-- Find the names of all apps that are rated less than 3 with at least 10000 reviews.
-- Find the top 10 most-reviewed apps that cost between 10 cents and a dollar.
-- Find the most out of date app. Hint: You don’t need to do it this way, but it’s possible to do with a subquery: http://www.postgresqltutorial.com/postgresql-max-function/
-- Find the most expensive app (the query is very similar to #11).
-- Count all the reviews in the Google Play Store.
-- Find all the categories that have more than 300 apps in them.
-- Find the app that has the highest proportion of min_installs to reviews, among apps that have been installed at least 100,000 times. Display the name of the app along with the number of reviews, the min_installs, and the proportion.