const snoowrap = require('snoowrap');

let redditPosts = [];
let isValidReq = null;
let isBusy = false;

const apiParser = new snoowrap({
    userAgent: 'Unwrap Reddit API Parser- Kyle Ng',
    clientId: 'qWhfH3k31_jr6awhEb3TSQ',
    clientSecret: 'aCsq5mE-nmuorGRyBGWYwAe9yLrpUw',
    username: 'unwrapreddit',
    password: 'redditpass'
    // refreshToken: 'put your refresh token here'
});

async function fetchSubRedditPosts(subRedditName) {
    redditPosts = await apiParser.getTop(subRedditName, {time: "year", limit: 500});
    console.log("done");
}

async function getSubReddit(subRedditName){
    let subreddit = await apiParser.getSubreddit(subRedditName)
    console.log(subreddit);
}

async function safeFetchSubRedditPosts(subRedditName){
    await isValidSubreddit(subRedditName)
    // console.log("isValidReq " + isValidReq); // todo remove
    if (isValidReq){
        isBusy = true;
        await fetchSubRedditPosts(subRedditName);
        console.log("finsihed fetching 500 posts" + "is busy before update" + isBusy )
        isBusy = false;
        console.log("is busy after update " + isBusy);
    }
}

async function isValidSubreddit(subRedditName) {
    await apiParser.getTop(subRedditName, {time: "year", limit: 1})
        .then( (validPost) => {
                console.log("Valid Post " + validPost); //todo remove
                isValidReq = true;
        })
        .catch( (invalidPostError) => {
            console.log("Invalid Post " + invalidPostError); //todo remove
            isValidReq = false;
        });
}


export{fetchSubRedditPosts, redditPosts, getSubReddit, isValidSubreddit, safeFetchSubRedditPosts}
