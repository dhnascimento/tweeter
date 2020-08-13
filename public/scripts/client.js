/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// For example, with HTML, <script> would be converted to &lt;script&gt;
// <script>$('body').empty()</script>


// function encodeHTML(s) {
//   return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
// };

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const renderTweets = function(tweets) {
  for (const item of tweets.reverse() ) {
    createTweetElement(item);
  }
};

const createTweetElement = function(tweet) {
    let date1 = new Date(tweet.created_at);
    let date2 = new Date(Date.now());
    let milis = date2 - date1;
    let days = Math.floor((milis)/(1000 * 3600 * 24));
    
    let html = `
  <article>
    <header class="tweettop">
      <div class=userinfo>
        <img class="avatar" src=${tweet.user.avatars}>
        <span class="username">${tweet.user.name}</span>
      </div>
      <h5 class="userurl">${tweet.user.handle}</h5>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer  class="tweetbottom">
    <span class="tweetinfo">${days.toString() + " days ago"}</span>
    <span class="tweetinfo">Cool icons here</span>
    </footer>
  </article>`;
  
  return  $('.tweets-box').append(html);
 
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
  loadTweets();
  $('#tweet-form').on('submit', (evt) => {
    $('.alert').empty();
    evt.preventDefault(); 
    let dataT = $('#tweet-text');
    let tweetLength = (dataT.val().length);
;    if (tweetLength > 140) {
      return $('.new-tweet').prepend('<p class=alert> Your tweet is too long! 140 characters maximum! </p>')
    } else if (tweetLength === 0 || !dataT) {
      return $('.new-tweet').prepend('<p class=alert> Please write something to submit. No empty tweets allowed </p>')
    } else {
      let newData= dataT.serialize();
      console.log('Button clicked, performing ajax call...');
      $.ajax({url: urlTest, data:newData, method: 'POST' })
        .then((response) => {
          $('textarea[name="text"]').val('');
          loadTweets();
      })
    }
  })
    
});    
    const loadTweets = function() {
      $('.tweets-box').empty();
      let dataJ = '/data-files/initial-tweets.json';
      console.log(dataJ);
      $.ajax({url: '/tweets', method: 'GET'})
      .then((data) => {
        return renderTweets(data)
      }) 
    }
    
    // loadTweets();    
    
