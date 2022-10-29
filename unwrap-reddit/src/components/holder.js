// check if pictures also increase

export class Analytics {
    //takes a Listing of 500 subreddit posts and propagates data members
    static arrayOfPosts;

    // Top Frequency by Day of Week
    static numDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
    static topThreeDays = {
        title: "Best Day to Post",
        1: {index: -2, frequency: -1, percentage: -1, string: "Analytics.arrayStringDayOfWeek[this.topThreeDays[1].index]"},
        2: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
        3: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
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
        for (let i = 0; i < dataArray.length; i++) {
            if(dataArray[i] > outputObject[1].frequency){
                // shift the other entries down
                this.shift(outputObject[1], outputObject[2]);

                console.log("the day " + i + " is first")
                outputObject[1].frequency = dataArray[i];
                outputObject[1].index = i;
                outputObject[1].string = this.arrayStringDayOfWeek[i];
                outputObject[1].percentage = dataArray[i] / totalPosts;

            } else if (dataArray[i] > outputObject[2].frequency){
                console.log("the day " + i + " is second")
                outputObject[2].frequency = dataArray[i];
                outputObject[2].index = i;
                console.log("outputObject[2].index: " + outputObject[2].index)
                outputObject[2].string = this.arrayStringDayOfWeek[i];
                outputObject[2].percentage = dataArray[i] / totalPosts;
            }
        }
        console.log("first is day " + outputObject[1].index + " with frequency of " + outputObject[1].frequency)
        console.log("second is day " + outputObject[2].index + " with frequency of " + outputObject[2].frequency)

        // outputObject.totalPercentage = outputObject[1].percentage
        //     + outputObject[2].percentage + outputObject[3].percentage;
    }

    static shift(objInput, toObjTarget){
        toObjTarget.frequency = objInput.frequency;
        toObjTarget.index = objInput.index;
        toObjTarget.string = objInput.string;
        toObjTarget.percentage = objInput.percentage;
    }

    static setRanking(ranking, nthDay, totalPosts, outputObject) {
        ranking = 2
        outputObject[ranking].nthDay = nthDay;
        outputObject[ranking].string = this.arrayStringDayOfWeek[nthDay];
        outputObject[ranking].frequency = this.numDayOfWeek[nthDay];
        outputObject[ranking].percentage = this.numDayOfWeek[nthDay] / totalPosts;
        console.log("setting " + ranking + " place to " + outputObject[ranking].frequency)
        // console.log("ranking for " + ranking + ": ")
        // console.log(outputObject)
    }

}
