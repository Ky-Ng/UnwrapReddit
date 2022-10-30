// check if pictures also increase

export class Analytics {
    //takes a Listing of 500 subreddit posts and propagates data members
    static arrayOfPosts;

    // Top Frequency by Day of Week
    static numDayOfWeek;
    static topThreeDays;

    // Top Frequency by Hour
    static numAtHours;
    static topThreeHours;

    //Top Frequency by Title Length
    static numAtTitleLengths;
    static topThreeTitleLengths;

    // Top Frequency by Word
    static topThreeWords;

    static getAnalytics(){
        return {
            weekday: {
                graphData: {yVal: this.numDayOfWeek, xLabel: ['S', 'M', 'T', 'W', 'T', 'F', 'S']},
                cardData: this.topThreeDays,
            },
            hours: {
                graphData: {yVal: this.numAtHours, xLabel: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']},
                cardData: this.topThreeHours,
            },
            titleLength: {
                graphData: {yVal: this.numAtTitleLengths, xLabel: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']},
                cardData: this.topThreeTitleLengths,
            }
        }
    }

    static fetchData(subRedditListing) {
        this.arrayOfPosts = subRedditListing;
        console.log(subRedditListing)
        console.log("Fetching for " + subRedditListing[0].subreddit_name_prefixed)
        this.resetData();

        this.arrayOfPosts.forEach((post) => {
            this.countTotalTimeOfWeek(post.created_utc * 1000);
            this.countTitleData(post.title);
        });
        console.log(this.numAtTitleLengths)

        this.setTop(this.numDayOfWeek, this.topThreeDays, this.arrayOfPosts.length);
        this.setTop(this.numAtHours, this.topThreeHours, this.arrayOfPosts.length);
        this.setTop(this.numAtTitleLengths, this.topThreeTitleLengths, this.arrayOfPosts.length)
    }

    static resetData(){
        this.numDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
        this.topThreeDays = {
            title: "Best Day to Post",
            1: {index: -2, frequency: -1, percentage: -1, string: "Analytics.arrayStringDayOfWeek[this.topThreeDays[1].index]"},
            2: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            3: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            similarFrequency: false,
            totalPercentage: -1,
            toStringArray: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        }

        // Frequency by
        this.numAtHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.topThreeHours = {
            title: "Best Hour to Post",
            1: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            2: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            3: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            similarFrequency: false,
            totalPercentage: -1,
            toStringArray: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'],

        }
        // Top Frequency by Title Length
        // assume that there is no length title greater than 40 words
        this.numAtTitleLengths =   [0,0,0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0,0,0,
                                    // 0,0,0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0,0,0,];
        this.topThreeTitleLengths = {
            title: "Best Title Length",
            1: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            2: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            3: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            similarFrequency: false,
            totalPercentage: -1,
            toStringArray:  ['1 Word', '2 Words', '3 Words', '4 Words', '5 Words','6 Words', '7 Words','8 Words', '9 Words','10 Words',
                            '11 Words','12 Words', '13 Words', '14 Words', '15 Words','16 Words', '17 Words','18 Words', '19 Words','20 Words',
                            '21 Words','22 Words', '23 Words', '24 Words', '25 Words','26 Words', '27 Words','28 Words', '29 Words','30 Words',]
                            // '31 Words','32 Words', '33 Words', '34 Words', '35 Words','36 Words', '37 Words','38 Words', '39 Words','40 Words'],
        };
        // top three words
        this.topThreeWords = {
            1: {word: String, frequency: Number,},
            2: {word: String, frequency: Number,},
            3: {word: String, frequency: Number,},
        }
    }

    static countTotalTimeOfWeek(time) {
        const date = new Date(time);
        this.numDayOfWeek[date.getDay()] += 1;
        this.numAtHours[date.getHours()] += 1;
    }

    static countTitleData(title){
        const wordsInTitleArr = title.split(' ');
        const numWordsInTitle = wordsInTitleArr.length;
        // numWordsInTitle - 1 because we don't have titles of 0 words
        this.numAtTitleLengths[numWordsInTitle-1] += 1;

    }

// eslint-disable-next-line no-unused-vars
    static setTop(dataArray, outputObject, totalPosts) {
        for (let i = 0; i < dataArray.length; i++) {
            if(dataArray[i] > outputObject[1].frequency){
                this.shiftDown(outputObject[2], outputObject[3]);
                this.shiftDown(outputObject[1], outputObject[2]);
                this.setRanking(1, outputObject, dataArray, i, totalPosts);

            } else if (dataArray[i] > outputObject[2].frequency){
                this.shiftDown(outputObject[2], outputObject[3])
                this.setRanking(2, outputObject, dataArray, i, totalPosts);

            } else if (dataArray[i] > outputObject[3].frequency){
                this.setRanking(3, outputObject, dataArray, i, totalPosts);
            }
        }
        // console.log("first is " + outputObject[1].index + " with frequency of " + outputObject[1].frequency)
        // console.log("second is " + outputObject[2].index + " with frequency of " + outputObject[2].frequency)
        // console.log("third is " + outputObject[3].index + " with frequency of " + outputObject[3].frequency)
        // console.log("percentage 1 " + outputObject[1].percentage)
        // console.log("percentage 2 " + outputObject[2].percentage)
        // console.log("percentage 3 " + outputObject[3].percentage)

        outputObject.totalPercentage = outputObject[1].percentage + outputObject[2].percentage + outputObject[3].percentage;
    }

    static shiftDown(objInput, toObjTarget){
        toObjTarget.frequency = objInput.frequency;
        toObjTarget.index = objInput.index;
        toObjTarget.string = objInput.string;
        toObjTarget.percentage = objInput.percentage;
    }

    static setRanking(ranking, outputObject, dataArray, index, totalPosts) {
        outputObject[ranking].frequency = dataArray[index];
        outputObject[ranking].index = index;
        outputObject[ranking].string = outputObject.toStringArray[index];
        outputObject[ranking].percentage = dataArray[index] / totalPosts;
    }

}
