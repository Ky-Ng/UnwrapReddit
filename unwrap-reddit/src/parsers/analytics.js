// check if pictures also increase

export class Analytics {
    //takes a Listing of 500 subreddit posts and propagates data members
    static arrayOfPosts;

    // Top Frequency by Day of Week
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

    // Top Frequency by Hour
    static numAtHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    static topThreeHours = {
        title: "Best Time to Post",
        1: {hour: -2, frequency: -1, percentage: -1, string: "No Day"},
        2: {hour: -2, frequency: -1, percentage: -1, string: "No Day"},
        3: {hour: -2, frequency: -1, percentage: -1, string: "No Day"},
        similarFrequency: false,
        totalPercentage: -1,
    }

    // Top Frequency by Word
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

    static getAnalytics(){
        return {
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

    static fetchData(subRedditListing) {
        this.arrayOfPosts = subRedditListing;
        console.log(subRedditListing)
        console.log("Fetching for " + subRedditListing[0].subreddit_name_prefixed)
        this.resetData();

        this.arrayOfPosts.forEach((post) => {
            this.countTotalTimeOfWeek(post.created_utc * 1000)
        });
        console.log(this.numDayOfWeek)

        this.setTop(this.numDayOfWeek, this.topThreeDays, this.arrayOfPosts.length);
    }

    static resetData(){
        this.numDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
        this.numAtHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

    static countTotalTimeOfWeek(time) {
        const date = new Date(time);
        this.numDayOfWeek[date.getDay()] += 1;
        this.numAtHours[date.getHours()] += 1;
    }
// eslint-disable-next-line no-unused-vars
    static setTop(dataArray, outputObject, totalPosts) {
        // dataArray = [0,0,0,0,1,2,3];//[1, 2, 2, 3, 1, 1, 0]
        for (let i = 0; i < dataArray.length; i++) {
            // console.log("the frequency of day " + i + " is " + dataArray[i])
            if (dataArray[i] > outputObject[1].frequency) {
                this.setRanking(1, i, totalPosts, outputObject);
            } else if (dataArray[i] > outputObject[2].frequency) {
                this.setRanking(2, i, totalPosts, outputObject);
            } else if (dataArray[i] > outputObject[3].frequency) {
                this.setRanking(3, i, totalPosts, outputObject);
            }
        }
        console.log("1st Day " + outputObject[1].nthDay + " frequency is " + outputObject[1].frequency)
        console.log("2nd Day " + outputObject[2].nthDay + " frequency is " + outputObject[2].frequency)
        console.log("3rd Day " + outputObject[3].nthDay + " frequency is " + outputObject[3].frequency)

        // outputObject.totalPercentage = outputObject[1].percentage
        //     + outputObject[2].percentage + outputObject[3].percentage;
    }

    static setRanking(ranking, nthDay, totalPosts, outputObject) {
        outputObject[ranking].nthDay = nthDay;
        outputObject[ranking].string = this.arrayStringDayOfWeek[nthDay];
        outputObject[ranking].frequency = this.numDayOfWeek[nthDay];
        outputObject[ranking].percentage = this.numDayOfWeek[nthDay] / totalPosts;
        // console.log("ranking for " + ranking + ": ")
        // console.log(outputObject)
    }

}
