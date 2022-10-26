const snoowrap = require('snoowrap');

const apiParser = new snoowrap({
    // userAgent: 'put your user-agent string here',
    userAgent: 'this is a description of my apiParser- Kyle Ng',
    clientId: 'qWhfH3k31_jr6awhEb3TSQ',
    clientSecret: 'aCsq5mE-nmuorGRyBGWYwAe9yLrpUw',
    username: 'Maleficent_Dish_3872',
    password: 'redditpass'
    // refreshToken: 'put your refresh token here'
});

function printFromParser(){
    console.log("hello from parser");
}

function getSubReddit() {

    console.log(apiParser.getSubreddit('AskReddit'));
}

export{printFromParser, getSubReddit}
