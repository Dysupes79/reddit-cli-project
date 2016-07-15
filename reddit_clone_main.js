var redditCloneFunctions = require('./reddit_clone_functions.js');
var requestAsJson = redditCloneFunctions.requestAsJson;
var getHomepage = redditCloneFunctions.getHomepage;
var getSortedHomepage = redditCloneFunctions.getSortedHomepage;
var getSubreddit = redditCloneFunctions.getSubreddit;
var getSortedSubreddit = redditCloneFunctions.getSortedSubreddit;
var getSubreddits = redditCloneFunctions.getSubreddits;
var inquirer = require('inquirer');
var prompt = require('prompt');
var request = require('request');

var mainMenuChoices = [
    {name: 'Reddit Homepage', value: 'HOMEPAGE'},
    {name: 'Subreddits', value:'SUBREDDIT'},
    {name: 'List of Subreddits', value: 'SUBREDDITLIST'}
];

function makeAChoice (){
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to browse today?',
        choices: mainMenuChoices
    }).then (
        function(answers){
            var userChoice = answers.menu;
            
            if(userChoice === 'HOMEPAGE'){
                getHomepage(function(err, response){
                   
                    if(err){
                        console.error('err1', err);
                    }
                    else {
                        var finalHomepage = response.map(function(dataElement){
                            return {
                                title : dataElement.data.title, 
                                url : dataElement.data.url,
                                votes : dataElement.data.ups,
                                username : dataElement.data.author
                            };
                        });
                        console.log(finalHomepage);
                        makeAChoice();
                    }
                });
            }
            else if(userChoice === 'SUBREDDIT'){
                prompt.get('usersChoice', function(err, res){
                    if(err){
                        console.error('err2', err);
                    }
                    else {
                        var subRedditChoice = res.usersChoice;
                   
                        getSubreddit(subRedditChoice, function(err, response){
                            if(err){
                                console.error('err1', err.stack);
                            }
                            else {
                                var usersSubreddit = response.map(function(dataElement){
                                return {
                                    title : dataElement.data.title, 
                                    url : dataElement.data.url,
                                    username : dataElement.data.author
                                };
                            });
                            console.log(usersSubreddit);
                            }
                        });
                    }
                });    
            }
            else if(userChoice === 'SUBREDDITLIST'){
                getSubreddits(function(err, response){
                    if(err){
                        console.error('err', err.stack);
                    }
                    else{
                        var usersSubredditList = response.map(function(dataElement){
                            return {
                                name: dataElement.data.title,
                                value: {
                                    title : dataElement.data.title,
                                    url : dataElement.data.url,
                                    username : dataElement.data.author,
                                    displayName: dataElement.data.display_name
                                }
                            };
                        });
                        inquirer.prompt({
                            type: 'list',
                            name: 'menu',
                            message: 'Which subreddit would you like to read?',
                            choices: usersSubredditList
                        }).then(
                            function(answers){
                                var usersSubredditChoice = answers.menu;
                                var goToPost = usersSubredditChoice.displayName; 
                                getSubreddit(goToPost, function(err, response){
                                    if(err){
                                        console.error('err1', err.stack);
                                    }
                                    else {
                                        var usersSubreddit = response.map(function(dataElement){
                                        return {
                                            title : dataElement.data.title, 
                                            url : dataElement.data.url,
                                            username : dataElement.data.author,
                                            };
                                    });
                                    console.log(usersSubreddit);
                                    }
                                });
                            }
                        );
                    }
                });
            }
    });
}

makeAChoice();

