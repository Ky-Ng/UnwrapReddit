import {Analytics} from "@/parsers/analytics";

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
    redditPosts = await apiParser.getTop(subRedditName, {time: "year", limit: 50});
    // redditPosts = await apiParser.getHot(subRedditName, { limit: 10});
}


// eslint-disable-next-line no-unused-vars
async function safeFetchSubRedditPosts(subRedditName) {
    // Reformat subRedditName: cannot have whitespaces or start with r/
    subRedditName = subRedditName.replace(/\s/g, "");
    subRedditName = subRedditName.replace("r/", "");

    await isValidSubreddit(subRedditName);
    if (isValidReq) {
        await fetchSubRedditPosts(subRedditName);
        // let Analyzer;
        Analytics.fetchData(redditPosts);
    }
    isBusy = false;
}

async function isValidSubreddit(subRedditName) {
    if (subRedditName == null) isValidReq = false;
    isBusy = true;

    // Reformat subRedditName: cannot have whitespaces or start with r/
    subRedditName = subRedditName.replace(/\s/g, "");
    subRedditName = subRedditName.replace("r/", "");

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

function printPost(){
    redditPosts.forEach(post => {
        console.log(post)
    });
}

function getIsValidSubReddit(){
    return isValidReq;
}


export {printPostTitle, getIsValidSubReddit, isValidSubreddit, safeFetchSubRedditPosts, printPost}
