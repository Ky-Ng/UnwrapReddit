const snoowrap = require('snoowrap');

const apiParser = new snoowrap({
    userAgent: 'Unwrap Reddit API Parser- Kyle Ng',
    clientId: 'qWhfH3k31_jr6awhEb3TSQ',
    clientSecret: 'aCsq5mE-nmuorGRyBGWYwAe9yLrpUw',
    username: 'unwrapreddit',
    password: 'redditpass'
    // refreshToken: 'put your refresh token here'
});

let redditPosts = [];

async function fetchSubRedditPosts() {
    redditPosts = await apiParser.getTop('dogs', {time: "year", limit: 500});
    console.log("done");
}

async function getSubReddit(subRedditName){
    let subreddit = await apiParser.getSubreddit(subRedditName)
    console.log(subreddit);
}

export{fetchSubRedditPosts, redditPosts, getSubReddit}
