// check if pictures also increase

export class Analytics {
    //takes a Listing of 500 subreddit posts and propagates data members

    //data members:
    arrayOfPosts;
    numOfTitleLength = [0, 0, 0];
    numDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
    topThreeDays = {
        1: {nthDay: -2, frequency: -1, stringDay: "No Day"},
        2: {nthDay: -2, frequency: -1, stringDay: "No Day"},
        3: {nthDay: -2, frequency: -1, stringDay: "No Day"},
        similarFrequency: false,
    }
    arrayStringDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', ' Friday', 'Saturday'];
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

    constructor(subRedditListing) {
        this.arrayOfPosts = subRedditListing;
        this.arrayOfPosts.forEach((post) => {
            this.countTotalTimeOfWeek(post.created_utc * 1000)
            console.log(post.title)
        });
        this.setTopThreeDays();
        console.log("top three days " + this.topThreeDays["1"].stringDay + " " +
            this.topThreeDays["2"].stringDay + " " + this.topThreeDays["3"].stringDay);
        console.log("Day of wekk distribution " + this.numDayOfWeek);

    }

    countTotalTimeOfWeek(time) {
        const date = new Date(time);
        // date.toLocaleTimeString();
        console.log("Day of week " + date.getDay())
        this.numDayOfWeek[date.getDay()] += 1;
        console.log("get hours " + date.getHours())

        // this.numAtHours
    }

    setTopThreeDays() {
        for (let i = 0; i < this.numDayOfWeek.length; i++) {
            if (this.numDayOfWeek[i] > this.topThreeDays["1"].frequency) {
                this.setTopDay("1", i);
            } else if (this.numDayOfWeek[i] > this.topThreeDays["2"].frequency) {
                this.setTopDay("2", i);
            } else if (this.numDayOfWeek[i] > this.topThreeDays["3"].frequency) {
                this.setTopDay("3", i);
            }
        }
        // see if the average frequency is much greater than the top 3 choices
        // if the difference is small this means the day it was posted does not matter much
        let averageFrequency = 0;
        this.numDayOfWeek.forEach((freq) => averageFrequency+= freq);
        averageFrequency /= 7;
        console.log("Average Frequency is " + averageFrequency)
        if (Math.abs(averageFrequency - this.topThreeDays["1"].frequency) < 20){
            console.log("Difference in Average and Top Frequency is " + Math.abs(averageFrequency - this.topThreeDays["1"].frequency))
            this.topThreeDays.similarFrequency = true;
        }
    }

    setTopDay(ranking, nthDay) {
        this.topThreeDays[ranking].nthDay = nthDay;
        this.topThreeDays[ranking].stringDay = this.arrayStringDayOfWeek[nthDay];
        this.topThreeDays[ranking].frequency = this.numDayOfWeek[nthDay];
    }
}