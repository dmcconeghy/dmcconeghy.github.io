"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories");
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

//What happens when a user clicks submit on a new story

function navSubmitStoryClick(evt){
  console.debug("navSubmitStory");
  hidePageComponents();
  $allStoriesList.show();
  $storyForm.show();
}

$submitStory.on("click", navSubmitStoryClick);

//what happens when a user clicks on favorites

function navFavoritesClick(evt){
  console.debug("navFavoritesCLick");
  hidePageComponents();
  putFavoritesListOnPage();
}

$body.on("click", "#nav-favorites", navFavoritesClick);

//what happens when a user clicks on their stories
function navMyStories(evt){
  console.debug("navMyStories");
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-my-stories", navMyStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show only profile when clicking "profile" */

function navProfileClick(evt) {
  console.debug("navProfileClick");
  hidePageComponents();
  $userProfile.show();
}

$navUserProfile.on("click", navProfileClick);

/** When a user first logs in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  // $loginForm.hide();
  // $signupForm.hide();
  $navUserProfile.text(`${currentUser.username}`).show();
}

//what happens when a user clicks on their profile
function navProfileClick(evt){
  console.debug("navProfileClick");
  hidePageComponents();
  $userProfile.show();
  putFavoritesListOnPage();
  putUserStoriesOnPage();
  
}

$navUserProfile.on("click", navProfileClick);

