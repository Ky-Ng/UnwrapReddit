const snoowrap = require('snoowrap');

let redditPosts = [];
let isValidReq = null;

const apiParser = new snoowrap({
    userAgent: 'Unwrap Reddit API Parser- Kyle Ng',
    clientId: 'qWhfH3k31_jr6awhEb3TSQ',
    clientSecret: 'aCsq5mE-nmuorGRyBGWYwAe9yLrpUw',
    username: 'unwrapreddit',
    password: 'redditpass'
    // refreshToken: 'put your refresh token here'
});

async function fetchSubRedditPosts() {
    redditPosts = await apiParser.getTop('dogs', {time: "year", limit: 500});
    console.log("done");
}

async function getSubReddit(subRedditName){
    let subreddit = await apiParser.getSubreddit(subRedditName)
    console.log(subreddit);
}

async function safeFetchSubRedditPosts(subRedditName){
    await isValidSubreddit(subRedditName)
    console.log("isValidReq " + isValidReq);
    if (isValidReq){
        console.log("From safe fetch, this was a valid post");
    }
}

async function isValidSubreddit(subRedditName) {
    await apiParser.getTop(subRedditName, {time: "year", limit: 1})
        .then( (validPost) => {
                console.log("Valid Post " + validPost);
                isValidReq = true;
        })
        .catch( (invalidPostError) => {
            console.log("Invalid Post " + invalidPostError);
            isValidReq = false;
        });
}


export{fetchSubRedditPosts, redditPosts, getSubReddit, isValidSubreddit, safeFetchSubRedditPosts}
