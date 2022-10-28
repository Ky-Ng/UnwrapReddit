const snoowrap = require('snoowrap');

let redditPosts = [];
let isValidReq = null;
// eslint-disable-next-line no-unused-vars
let isBusy = null;

const apiParser = new snoowrap({
    userAgent: 'Unwrap Reddit API Parser- Kyle Ng',
    clientId: 'qWhfH3k31_jr6awhEb3TSQ',
    clientSecret: 'aCsq5mE-nmuorGRyBGWYwAe9yLrpUw',
    username: 'unwrapreddit',
    password: 'redditpass'
    // refreshToken: 'put your refresh token here'
});

async function fetchSubRedditPosts(subRedditName) {
    // todo increase the number of posts to 500
    redditPosts = await apiParser.getTop(subRedditName, {time: "year", limit: 100});
}

async function safeFetchSubRedditPosts(subRedditName) {
    await isValidSubreddit(subRedditName);
    if (isValidReq) {
        await fetchSubRedditPosts(subRedditName);
    }
    isBusy = false;
}

async function isValidSubreddit(subRedditName) {
    if (subRedditName == null) isValidReq = false;
    isBusy = true;
    await apiParser.getTop(subRedditName, {time: "year", limit: 1})
        .then((validPost) => {
            console.log("Valid Post " + validPost);
            isValidReq = true;
        })
        .catch((invalidPostError) => {
            console.log("Invalid Post " + invalidPostError); //todo remove
            isValidReq = false;
        });
}

function printPostTitle() {
    redditPosts.forEach(post => {
        console.log(post.title)
    });
}

function getIsValidSubReddit(){
    return isValidReq;
}


export {printPostTitle, safeFetchSubRedditPosts, getIsValidSubReddit, isValidSubreddit}
