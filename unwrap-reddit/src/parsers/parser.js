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
    // await apiParser.getTop('dogs').map(post => {
    //         arrRes.push(post);
    //         // console.log(post.title);
    //     }
    // );
    await apiParser.getTop('dogs',
        // {before: arrRes[arrRes.length-1].id}
        {time: "year", limit: 500}
        ).map(post => {
            arrRes.push(post);
            // console.log(post.title);
        }
    );
    console.log("done");
}

export{printFromParser, getSubReddit, arrRes}
