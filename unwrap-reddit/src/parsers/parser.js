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
    // todo increase the number of posts to 500
    redditPosts = await apiParser.getTop(subRedditName, {time: "year", limit: 100});
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
        console.log("just updated that isBusy is true");
        await fetchSubRedditPosts(subRedditName);
        console.log("finsihed fetching 500 posts" + "is busy before update" + isBusy )
        isBusy = false;
        console.log("is busy after update " + isBusy);
    } else {
        isBusy = false;
    }
}

async function isValidSubreddit(subRedditName) {
    isBusy = true;
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

// blocks the thread until isBusy becomes false
function waitWhileParserBusy(){
    console.log("before wait block waitWhileParserBusy " + isBusy)
    while(isBusy){
        console.log("in waitWhileParserBusy " + isBusy)
        // block the thread
    }
}


export{fetchSubRedditPosts, redditPosts, getSubReddit, isValidSubreddit, safeFetchSubRedditPosts, isBusy, waitWhileParserBusy}
