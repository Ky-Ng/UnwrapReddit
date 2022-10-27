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

export{fetchSubRedditPosts, redditPosts}
