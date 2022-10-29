// check if pictures also increase

export class Analytics {
    //takes a Listing of 500 subreddit posts and propagates data members

    //data members:
    static arrayOfPosts;
    static subRedditName;
    numOfTitleLength = [0, 0, 0];
    static numDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
    static topThreeDays = {
        title: "Best Day to Post",
        1: {nthDay: -2, frequency: -1, percentage: -1, stringDay: "No Day"},
        2: {nthDay: -2, frequency: -1, percentage: -1, stringDay: "No Day"},
        3: {nthDay: -2, frequency: -1, percentage: -1, stringDay: "No Day"},
        similarFrequency: false,
        totalPercentage: -1,
    }
    static arrayStringDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // use bucket sort method by Hour
    static numAtHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    static topTenWords = {
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

    static fetchData(subRedditListing) {
        this.subRedditName = subRedditListing.title;
        this.arrayOfPosts = subRedditListing;
        this.arrayOfPosts.forEach((post) => {
            this.countTotalTimeOfWeek(post.created_utc * 1000)
            console.log(post.title)
        });

        this.setTopThreeDays();
        console.log("top three days " + this.topThreeDays["1"].stringDay + " " +
            this.topThreeDays["2"].stringDay + " " + this.topThreeDays["3"].stringDay);
        console.log("Day of wekk distribution " + this.numDayOfWeek);

        for (let i = 0; i <24 ; i++) {
            console.log("hour: " + i + "freq: " + this.numAtHours[i])
        }

    }

    static countTotalTimeOfWeek(time) {
        const date = new Date(time);
        this.numDayOfWeek[date.getDay()] += 1;
        this.numAtHours[date.getHours()] += 1;
        console.log(this.numDayOfWeek);
    }

    static setTopThreeDays() {
        let totalPosts = 0;
        for (let i = 0; i < 7; i++) {
            totalPosts += this.numDayOfWeek[i];
        }

        for (let i = 0; i < this.numDayOfWeek.length; i++) {
            if (this.numDayOfWeek[i] > this.topThreeDays["1"].frequency) {
                this.setTopDay("1", i, totalPosts);
            } else if (this.numDayOfWeek[i] > this.topThreeDays["2"].frequency) {
                this.setTopDay("2", i, totalPosts);
            } else if (this.numDayOfWeek[i] > this.topThreeDays["3"].frequency) {
                this.setTopDay("3", i, totalPosts);
            }
        }

        this.topThreeDays.totalPercentage = this.topThreeDays["1"].percentage
            + this.topThreeDays["2"].percentage + this.topThreeDays["3"].percentage;

        // if the difference between average and top is low this means the day it was posted does not matter much
        let averageFrequency = totalPosts / 7;

        if (Math.abs(averageFrequency - this.topThreeDays["1"].frequency) < 20){
            this.topThreeDays.similarFrequency = true;
        }
    }

    static setTopDay(ranking, nthDay, totalPosts) {
        this.topThreeDays[ranking].nthDay = nthDay;
        this.topThreeDays[ranking].stringDay = this.arrayStringDayOfWeek[nthDay];
        this.topThreeDays[ranking].frequency = this.numDayOfWeek[nthDay];
        this.topThreeDays[ranking].percentage = this.numDayOfWeek[nthDay] / totalPosts;
    }

    static getTopThreeDays(){
        return {
            // subRedditName:" this.subRedditName,",
            frequencyDays: {frequency: this.numDayOfWeek, days: ['S', 'M', 'T', 'W', 'T', 'F', 'S']},
            topDays: this.topThreeDays,
        }
    }
}
