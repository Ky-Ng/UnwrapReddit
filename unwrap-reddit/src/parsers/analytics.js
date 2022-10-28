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
            this.countTotalDayOfWeek(post.created_utc * 1000)
        });
        var s = new Date(1504095567183).toLocaleDateString("en-US")
// expected output "8/30/2017"
        console.log("The grebber code example" + s);
    }

    countTotalDayOfWeek(time){
        const date = new Date(time);
        // date.toLocaleTimeString();
        console.log("day of week " + date.getDay())
        console.log("Date should be " + date);
    }
}