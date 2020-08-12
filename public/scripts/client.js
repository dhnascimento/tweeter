/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



const renderTweets = function(tweets) {
  let counter = 1;
  for (const item of tweets ) {
    console.log(item);
    let tag = `<article id=${counter.toString()}></article>`;
    createTweetElement(item, tag, counter);
    counter ++;
  }
}

const createTweetElement = function(tweet, tag, counter) {
  $(document).ready(function () {
    
    let html = `<header class="tweettop">
      <div class=userinfo>
        <img class="avatar" src=${tweet.user.avatars}>
        <span class="username">${tweet.user.name}</span>
      </div>
      <h5 class="userurl">${tweet.user.handle}</h5>
    </header>
    <p>${tweet.content.text}</p>
    <footer  class="tweetbottom">
    <span class="tweetinfo">${new Date(tweet.created_at).toString()}</span>
    <span class="tweetinfo">Cool icons here</span>
    </footer>
    </article>`;

  $('section').append(tag);
  return $(`#${counter.toString()}`).append(html);
  })
};


renderTweets(data);