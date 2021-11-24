"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
  
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  //logged in? Show your favorite stars
  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        ${showDeleteBtn ? getDeleteButton() : ""}
        ${showStar ? getStar(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

//create a delete button 
function getDeleteButton() {
  return `<span class="trash-can"><i class="fas fa-trash-alt"></i></span>`;
}

//make stars or not for every story for this user
function getStar(story, user){
  const isFavorite = user.isFavorite(story)
  const starType = isFavorite ? "fas" : "far";
  return `<span class="star"><i class="${starType} fa-star"></i></span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function deleteStory(evt){
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");
  console.log("deleting storyID", storyId)
  await storyList.removeStory(currentUser, storyId);

  await putUserStoriesOnPage();
}

$ownStories.on("click", ".trash-can", deleteStory);

async function submitUserStory(e){
  console.debug("submitUserStory");
  e.preventDefault();
  
  const title = $("#story-title").val();
  const author = $("#story-author").val();
  const url = $("#story-url").val();
  const username = currentUser.username
  const storyData = { title, author, url, username };

  const story = await storyList.addStory(currentUser, storyData)
  
  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  
  $storyForm.slideUp("slow");
  $storyForm.trigger("reset")
  
}

$storyForm.on("submit", submitUserStory);

function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $ownStories.empty();
  

  if (currentUser.ownStories.length === 0) {
    $ownStories.append("<h5>No stories added by user yet!</h5><hr>");
  } else {
    // loop through all of users stories and generate HTML for them
    $ownStories.append("<h3>Your submitted stories:</h3><hr>");
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }

  $ownStories.show();
  
}

// display a favorites list mirroring putStoriesOnPage()
async function putFavoritesListOnPage(){
  console.debug("putFavoritesListOnPage");

  $favoritedStories.empty();
  //if no favorites
  if (currentUser.favorites.length === 0){
  $favoritedStories.append("<h5>No favorite stories</h5><hr>");
  } else {
    //get all the stories from the array of favorites stories
    $favoritedStories.append("<h3>Your favorite stories:</h3><hr>");
    for(let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }

  $favoritedStories.show()
}

async function toggleFavoriteStory(evt) {
  console.debug("toggleFavoriteStory")

  //get the target
  const $tgt = $(evt.target);
  //find its list element
  const $closestLi = $tgt.closest("li");
  //get its id
  const storyId = $closestLi.attr("id");
  console.log("trying to delete storyID", storyId)
  //find it in the storyList
  const story = storyList.stories.find(s => s.storyId === storyId)
  
  //does the selected story have a star?
  if ($tgt.hasClass("fas")) {
    //Yes, so remove it from the favorites and change the star
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    // No? Add it to favorites, give it a star
    await currentUser.addFavorite(story)
    $tgt.closest("i").toggleClass("fas far");
  }
}

$storiesList.on("click", ".star", toggleFavoriteStory);
