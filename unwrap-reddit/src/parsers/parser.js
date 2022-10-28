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

async function safeFetchSubRedditPosts(subRedditName){
    if (await isValidSubreddit(subRedditName) != false){
        console.log("From safe fetch, this was a valid post");
    }
}

async function isValidSubreddit(subRedditName) {
    await apiParser.getTop(subRedditName, {time: "year", limit: 1})
        .then( (validPost) => {
                console.log("Valid Post " + validPost);
                return true;
        })
        .catch( (invalidPostError) => {
            console.log("Inalid Post " + invalidPostError);
            return false;
        });
}


export{fetchSubRedditPosts, redditPosts, getSubReddit, isValidSubreddit, safeFetchSubRedditPosts}
