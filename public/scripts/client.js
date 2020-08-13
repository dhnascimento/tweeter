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
    let tag = `<article id=${counter.toString()}></article>`;
    createTweetElement(item, tag, counter);
    counter ++;
  }
}

const createTweetElement = function(tweet, tag, counter) {
    let date1 = new Date(tweet.created_at);
    let date2 = new Date(Date.now());
    let milis = date2 - date1;
    let days = Math.floor((milis)/(1000 * 3600 * 24));
    
    let html = `<header class="tweettop">
      <div class=userinfo>
        <img class="avatar" src=${tweet.user.avatars}>
        <span class="username">${tweet.user.name}</span>
      </div>
      <h5 class="userurl">${tweet.user.handle}</h5>
    </header>
    <p>${tweet.content.text}</p>
    <footer  class="tweetbottom">
    <span class="tweetinfo">${days.toString() + " days ago"}</span>
    <span class="tweetinfo">Cool icons here</span>
    </footer>
    </article>`;

  $('section').append(tag);
  return $(`#${counter.toString()}`).append(html);
 
};

const urlTest = '/tweets';

// Method 1

// $(document).ready(function () { 
//   $('#tweet-form').on('submit', function(e) {
//     e.preventDefault();
//     let data = $(this).serialize();
//     console.log('serialized text: ', data);
//     $.post('/tweets', data)
//       .then((res) => console.log('yippy!', res));
//   })

// Method 2;

$(document).ready(function () { 
  $('#tweet-form').on('submit', (evt) => {
  
    evt.preventDefault(); 
    let dataT = $('textarea[name="text"]')
    let tweetLength = (dataT.val().length);
    
    if (tweetLength > 140) {
      return alert("Your tweet has more than 140 characters!")
    } else if (tweetLength === 0 || !dataT) {
      return alert("Please tweet something")
    } else {
      let newData= dataT.serialize();
      console.log('Button clicked, performing ajax call...');
      $.ajax({url: urlTest, data:newData, method: 'POST' })
        .then((res) => {
          console.log("yeeey", res);
      });
    }
  })
    
    
    
    const loadTweets = function() {
      let dataJ = '/data-files/initial-tweets.json';
      console.log(dataJ);
      $.ajax({url: '/tweets', method: `GET`})
      .then((data) => {
        return renderTweets(data)
      }) 
    }
    
    loadTweets();    
    
});