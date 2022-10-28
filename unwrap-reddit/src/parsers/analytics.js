// check if pictures also increase

export class Analytics {
    //takes a Listing of 500 subreddit posts and propagates data members

    //data members:
    arrayOfPosts;
    numOfTitleLength = [0, 0, 0];
    numDayOfWeek = {monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0}
    numAtHours = [];
    topTenWords = {
        0: {word: String, frequency: Number,},
        1: {word: String, frequency: Number,},
        2: {word: String, frequency: Number,},
        3: {word: String, frequency: Number,},
        4: {word: String, frequency: Number,},
        5: {word: String, frequency: Number,},
        6: {word: String, frequency: Number,},
        7: {word: String, frequency: Number,},
        8: {word: String, frequency: Number,},
        9: {word: String, frequency: Number,}
    }

    constructor(subRedditListing){
        this.arrayOfPosts = subRedditListing;
        console.log("subreddit listing object is " + this.arrayOfPosts);
        this.arrayOfPosts.forEach((post) => {
            console.log("title " + post.title);
            this.countTotalDayOfWeek(post.created_utc)
        });
    }

    countTotalDayOfWeek(time){
        const date = new Date(time);
        date.toLocaleString();
        console.log("Date should be " + date);
    }
}