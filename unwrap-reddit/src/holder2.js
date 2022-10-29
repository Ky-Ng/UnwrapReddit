// check if pictures also increase

export class Analytics {
    //takes a Listing of 500 subreddit posts and propagates data members
    static arrayOfPosts;

    // Top Frequency Week Entry
    static numDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
    static topThreeDays = {
        title: "Best Day to Post",
        1: {nthDay: -2, frequency: -1, percentage: -1, string: "No Day"},
        2: {nthDay: -2, frequency: -1, percentage: -1, string: "No Day"},
        3: {nthDay: -2, frequency: -1, percentage: -1, string: "No Day"},
        similarFrequency: false,
        totalPercentage: -1,
    }
    static arrayStringDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // use bucket sort method to find top frequency Hour entry
    static numAtHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    static topThreeHours = {
        title: "Best Time to Post",
        1: {hour: -2, frequency: -1, percentage: -1, string: "No Day"},
        2: {hour: -2, frequency: -1, percentage: -1, string: "No Day"},
        3: {hour: -2, frequency: -1, percentage: -1, string: "No Day"},
        similarFrequency: false,
        totalPercentage: -1,
    }

    static setTopThreeHours() {
        let totalPosts = 0;
        for (let i = 0; i < 7; i++) {
            totalPosts += this.numDayOfWeek[i];
        }

        for (let i = 0; i < this.numAtHours.length; i++) {
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

    static setTopHour(ranking, nthDay, totalPosts) {
        this.topThreeDays[ranking].nthDay = nthDay;
        this.topThreeDays[ranking].string = this.arrayStringDayOfWeek[nthDay];
        this.topThreeDays[ranking].frequency = this.numDayOfWeek[nthDay];
        this.topThreeDays[ranking].percentage = this.numDayOfWeek[nthDay] / totalPosts;
    }

    // get top most frequent words

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
        this.subRedditName = subRedditListing[0].title;
        this.arrayOfPosts = subRedditListing;
        this.arrayOfPosts.forEach((post) => {
            this.countTotalTimeOfWeek(post.created_utc * 1000)
        });

        this.setTopThreeDays();
    }

    static countTotalTimeOfWeek(time) {
        const date = new Date(time);
        this.numDayOfWeek[date.getDay()] += 1;
        this.numAtHours[date.getHours()] += 1;
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
        this.topThreeDays[ranking].string = this.arrayStringDayOfWeek[nthDay];
        this.topThreeDays[ranking].frequency = this.numDayOfWeek[nthDay];
        this.topThreeDays[ranking].percentage = this.numDayOfWeek[nthDay] / totalPosts;
    }

    static getAnalytics(){
        return {
            subRedditName: this.subRedditName,
            weekday: {
                graphData: {yVal: this.numDayOfWeek, xLabel: ['S', 'M', 'T', 'W', 'T', 'F', 'S']},
                cardData: this.topThreeDays,
            },
            hours: {
                graphData: {yVal: this.numAtHours, xLabel: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']},
                cardData: this.topThreeHours,
            }
        }
    }
}
