// check if pictures also increase

export class Analytics {
    //takes a Listing of 500 subreddit posts and propagates data members
    static arrayOfPosts;

    // Top Frequency by Day of Week
    static freqDayOfWeek = [];
    static topThreeDays = Object;

    // Top Frequency by Hour
    static freqOfHour = [];
    static topThreeHours = Object;

    //Top Frequency by Title Length
    static freqOfTitleLength = [];
    static topThreeTitleLengths = Object;
    ;

    // Top Frequency by Word in Title
    static wordsInTitle = [];
    static freqOfWord = [];
    static xAxisWordsInTitle = [];
    static topThreeWords = Object;
    static fillerWords = ['a', 'and', 'the', 'my', 'i', 'what', 'will', 'was', 'were', 'for', 'your', 'our', 'it', 'as', 'but', 'do', 'are', 'about', 'have', 'so', 'to', 'is', 'of', 'you', 'in', 'with', 'me', "on", "this", "he", "their", "at", "that", "just", 'she', 'him']

    static getAnalytics() {
        return {
            weekday: {
                graphData: {
                    yVal: this.freqDayOfWeek,
                    xLabel: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    type: "trend"},
                cardData: this.topThreeDays,
            },
            hours: {
                graphData: {
                    yVal: this.freqOfHour,
                    xLabel: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                    type: "bar"
                },
                cardData: this.topThreeHours,
            },
            titleLength: {
                graphData: {
                    yVal: this.freqOfTitleLength,
                    xLabel: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
                    type: "bar",
                },
                cardData: this.topThreeTitleLengths,
            },
            word: {
                graphData: {
                    yVal: this.freqOfWord,
                    xLabel: this.xAxisWordsInTitle,
                    type: "trend"
                },
                cardData: this.topThreeWords,
            }
        }
    }

    static fetchData(subRedditListing) {
        this.arrayOfPosts = subRedditListing;
        this.resetData();

        this.arrayOfPosts.forEach((post) => {
            this.countTotalTimeOfWeek(post.created_utc * 1000);
            this.countTitleLength(post.title);
            this.countTitleWord(post.title)
        });

        this.setTop(this.freqDayOfWeek, this.topThreeDays, this.arrayOfPosts.length);
        this.setTop(this.freqOfHour, this.topThreeHours, this.arrayOfPosts.length);
        this.setTop(this.freqOfTitleLength, this.topThreeTitleLengths, this.arrayOfPosts.length)

        // Most abundant words in titles
        this.thresholdByFrequency(this.freqOfWord, this.wordsInTitle, 2);
        this.setTop(this.freqOfWord, this.topThreeWords, this.arrayOfPosts.length);
        this.createOutputXAxisTitle();
    }

    static resetData() {
        // Top Frequency by Day of Week
        this.freqDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
        this.topThreeDays = {
            title: "Best Day to Post",
            1: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            2: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            3: {index: -2, frequency: -1, percentage: -1, string: "No Day"},
            similarFrequency: false,
            totalPercentage: -1,
            toStringArray: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        }

        // Frequency by Hour
        this.freqOfHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.topThreeHours = {
            title: "Best Hour to Post",
            1: {index: -2, frequency: -1, percentage: -1, string: "No Hour"},
            2: {index: -2, frequency: -1, percentage: -1, string: "No Hour"},
            3: {index: -2, frequency: -1, percentage: -1, string: "No Hour"},
            similarFrequency: false,
            totalPercentage: -1,
            toStringArray: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'],

        }
        // Top Frequency by Title Length
        // assume that there is no length title greater than 40 words
        this.freqOfTitleLength = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            // 0,0,0,0,0,0,0,0,0,0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
        this.topThreeTitleLengths = {
            title: "Best Title Length",
            1: {index: -2, frequency: -1, percentage: -1, string: "No Length"},
            2: {index: -2, frequency: -1, percentage: -1, string: "No Length"},
            3: {index: -2, frequency: -1, percentage: -1, string: "No Length"},
            similarFrequency: false,
            totalPercentage: -1,
            toStringArray: ['1 Word', '2 Words', '3 Words', '4 Words', '5 Words', '6 Words', '7 Words', '8 Words', '9 Words', '10 Words',
                '11 Words', '12 Words', '13 Words', '14 Words', '15 Words', '16 Words', '17 Words', '18 Words', '19 Words', '20 Words',
                '21 Words', '22 Words', '23 Words', '24 Words', '25 Words', '26 Words', '27 Words', '28 Words', '29 Words', '30 Words',]
            // '31 Words','32 Words', '33 Words', '34 Words', '35 Words','36 Words', '37 Words','38 Words', '39 Words','40 Words'],
        };

        // Top Frequency by Word in Title
        this.wordsInTitle = [];
        this.xAxisWordsInTitle = [];
        this.freqOfWord = [];
        this.topThreeWords = {
            title: "Best Word in Titles",
            1: {index: -2, frequency: -1, percentage: -1, string: "No Word"},
            2: {index: -2, frequency: -1, percentage: -1, string: "No Word"},
            3: {index: -2, frequency: -1, percentage: -1, string: "No Word"},
            similarFrequency: false,
            totalPercentage: -1,
            toStringArray: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        }
    }

    static countTotalTimeOfWeek(time) {
        const date = new Date(time);
        this.freqDayOfWeek[date.getDay()] += 1;
        this.freqOfHour[date.getHours()] += 1;
    }

    static countTitleLength(title) {
        const wordsInTitleArr = title.split(' ');
        const numWordsInTitle = wordsInTitleArr.length;
        // ensure that the index is valid because will have some edge cases of really long titles
        if (numWordsInTitle - 1 < this.freqOfTitleLength.length) {
            // numWordsInTitle - 1 because we don't have titles of 0 words
            this.freqOfTitleLength[numWordsInTitle - 1] += 1;
        }
    }

    static countTitleWord(title) {
        const wordsInTitleArr = title.split(' ');
        wordsInTitleArr.forEach((word) => {
            word = this.formatWord(word);
            // take out filler words
            if (!this.hasWord(this.fillerWords, word)) {
                if (this.hasWord(this.wordsInTitle, word)) {
                    const indexOfWord = this.wordsInTitle.indexOf(word);
                    this.freqOfWord[indexOfWord] += 1;
                } else {
                    this.wordsInTitle.push(word)
                    this.freqOfWord.push(1)
                }
            }
        })
    }

    static thresholdByFrequency(arrOfFreq, arrOutput, threshold) {
        let length = arrOfFreq.length;
        for (let i = 0; i < length; i++) {
            if (arrOfFreq[i] <= threshold) {
                arrOfFreq.splice(i, 1)
                arrOutput.splice(i, 1)
                i--;
                length--;
            }
        }
    }

    static hasWord(arrOfWords, word) {
        const wordOffByOne = word.substring(0, word.length - 1);
        return arrOfWords.includes(word) ||
            arrOfWords.includes(wordOffByOne)
    }

    static formatWord(word) {
        word = word.toLowerCase();
        word = word.replace(',', "");
        word = word.replace('.', "");
        word = word.replace('!', "");
        word = word.replace('/', "");
        return word;
    }

    static createOutputXAxisTitle() {
        for (let i = 0; i < this.wordsInTitle.length; i++) {
            if (this.wordsInTitle[i] == this.topThreeWords[1].string ||
                this.wordsInTitle[i] == this.topThreeWords[2].string ||
                this.wordsInTitle[i] == this.topThreeWords[3].string) {
                this.xAxisWordsInTitle.push(this.wordsInTitle[i]);
            } else {
                this.xAxisWordsInTitle.push(' ')
            }
        }

    }


    static setTop(dataArray, outputObject, totalPosts) {
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i] > outputObject[1].frequency) {
                this.shiftDown(outputObject[2], outputObject[3]);
                this.shiftDown(outputObject[1], outputObject[2]);
                this.setRanking(1, outputObject, dataArray, i, totalPosts);

            } else if (dataArray[i] > outputObject[2].frequency) {
                this.shiftDown(outputObject[2], outputObject[3])
                this.setRanking(2, outputObject, dataArray, i, totalPosts);

            } else if (dataArray[i] > outputObject[3].frequency) {
                this.setRanking(3, outputObject, dataArray, i, totalPosts);
            }
        }
        outputObject.totalPercentage = outputObject[1].percentage + outputObject[2].percentage + outputObject[3].percentage;
    }

    static shiftDown(objInput, toObjTarget) {
        toObjTarget.frequency = objInput.frequency;
        toObjTarget.index = objInput.index;
        toObjTarget.string = objInput.string;
        toObjTarget.percentage = objInput.percentage;
    }

    static setRanking(ranking, outputObject, dataArray, index, totalPosts) {
        outputObject[ranking].frequency = dataArray[index];
        outputObject[ranking].index = index;
        if (outputObject.title == this.topThreeWords.title) {
            outputObject[ranking].string = this.wordsInTitle[index];
        } else {
            outputObject[ranking].string = outputObject.toStringArray[index];
        }
        outputObject[ranking].percentage = dataArray[index] / totalPosts;
    }

}
