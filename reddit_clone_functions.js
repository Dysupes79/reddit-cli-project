var inquirer = require('inquirer');
var request = require('request');
var prompt = require('prompt');

/*
This function should "return" the default homepage posts as an array of objects
*/
function requestAsJson(url, callback){
  request(url, function(err, response){
    if(err){
      callback(err);
    }
    else {
      try {
        var parsedBody = JSON.parse(response.body);
        callback(null,parsedBody);
      }
      catch (err) {
        callback(err);
      }
    }
  });
}

function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
  // TO: REPLACE request with requestAsJson!
  requestAsJson('https://reddit.com/.json', function(err, response) {

    if (err) {
      callback(err);
    }
    else {
      var homePage = response.data.children; // look at the result and explain why we're returning .data.children
      callback(null, homePage);
      }
  });
}

/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod, callback) {
  requestAsJson('https://www.reddit.com/' + sortingMethod + '.json', function(err, response) {
      if(err) {
        callback(err);
      }
      else {
        var sortedHomePage = response.data.children;
        callback(null, sortedHomePage);
      }
  });
}


  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit, callback) {
  requestAsJson('https://www.reddit.com/r/' + subreddit +'.json', function(err, response) {
      if(err){
        callback(err);
      } else {
        var subreddits = response.data.children;
        
        if(subreddits.length === 0){
          callback('This subreddit does not exist!', null)
        }
        else {
        callback(null, subreddits);  
        }
      }
  });
}
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts


/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  requestAsJson('https://www.reddit.com/r/' + subreddit + '/' + sortingMethod + '.json', function(err, response) {
    if(err){
      callback(err);
    }  
    else {
      var sortedSubreddit = response.data.children;
      callback(null, sortedSubreddit);
    }
  });
}
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods

/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  requestAsJson('https://www.reddit.com/subreddits.json', function(err, response) {
      if(err){
        callback(err);
      }
      else{
        var getAllTheSubreddits = response.data.children;
        callback(null, getAllTheSubreddits);
      }
  });
}
  // Load reddit.com/subreddits.json and call back with an array of subreddits

// Export the API
module.exports = {
  getSubreddits: getSubreddits,
  getSortedSubreddit: getSortedSubreddit,
  getSubreddit: getSubreddit,
  getSortedHomepage: getSortedHomepage,
  getHomepage: getHomepage,
  requestAsJson: requestAsJson
};