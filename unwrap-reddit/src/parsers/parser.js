const snoowrap = require('snoowrap');

const apiParser = new snoowrap({
    // userAgent: 'put your user-agent string here',
    userAgent: 'this is a description of my apiParser- Kyle Ng',
    clientId: 'qWhfH3k31_jr6awhEb3TSQ',
    clientSecret: 'aCsq5mE-nmuorGRyBGWYwAe9yLrpUw',
    username: 'unwrapreddit',
    password: 'redditpass'
    // refreshToken: 'put your refresh token here'
});

function printFromParser(){
    console.log("hello from parser");
}
let arrRes = [];

async function getSubReddit() {

    console.log(apiParser.getSubreddit('AskReddit'));
    // apiParser.getHot().map(post => post.title).then(console.log);
    // apiParser.getTop('dogs').map(post => post.title).then(console.log);

    await apiParser.getTop('dogs').map(post => {
            arrRes.push(post);
            // console.log(post.title);
        }
    );
    arrRes.forEach(
        redditpost => console.log(redditpost.title)
    );

}

export{printFromParser, getSubReddit, arrRes}
