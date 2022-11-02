# UnwrapReddit
Motivation: Understand and _unwrap_ the mystery behind the **Analytics of Reddit Posts** using the Reddit API and Vue Java Script.

## Try for yourself! 
Search any subreddit name and instantly get feedback on the best time, day of week, and title to maximize reception of your Reddit post based on **real, live SubReddit data**.

Live Deploy and Hosting through Firebase: https://unwrap-reddit.web.app

![Live Gif](https://github.com/Ky-Ng/UnwrapReddit/blob/main/unwrap-reddit/RedditAPI.gif)

## Frameworks Used
**Vue JS** for Dynamic Component Rendering

**Vuetify JS** for clean styling aesthetic following Google's Material Design philosophy

**JavaScript** for parsing(scraping) the Reddit API with Snoowrap Reddit API wrapper

## Data Analytics Algorithms and Optimizations
1. To increase the reliability of getting the top keywords used in the best Reddit post titles, the algorithm employs a set of filter words (such as "a", "the", "this", "are", etc) to reduce the noise of less semantically valued words. The algorithm also has a threshold to eliminate words with low occurences to speed up calculations and frontend rendering.

2. Components are  lazy loaded to preserve web app efficiency. Optimized sorting algorithms (bucket sorting) use Arrays and JavaScript Objects to reduce overhead and time complexity of the Analytics algorithms.

3. Bucket sort is the used for creating data analytics since time complexity (speed) is __O(n)__ or linear time which ensures the data is parsed as quickly as possible as soon as the Reddit API GET request is processed. See the modular bucket sorting method **_setTop()_** and dynamic data propagation method **_getAnalytics()_** used for the graphs: <a href="https://github.com/Ky-Ng/UnwrapReddit/blob/main/unwrap-reddit/src/parsers/analytics.js" target="_blank">here</a>.

## Project Engineering Notebook
Handwritten documentation and brainstorming can be found <a href="https://drive.google.com/file/d/1iBVjecYyGAPTyyon5YUIPPo8ehHfW4G9/view?usp=sharing" target="_blank">here</a>.

## Project File Tree
Using the Vue Java Script (Vue JS) framework instead of pure HTML and CSS condenses the file tree by allowing dynamic rendering of content and modualarizing repetitive features into reusable Child Components.

```
├── src
│   ├── App.vue
│   ├── components
│   │   ├── DataDisplay
│   │   │   ├── DataCard.vue
│   │   │   ├── DataDisplay.vue
│   │   │   │   └── AnalyticsHeaderCard.vue
│   │   │   │   └── AnalyticsGraph.vue
│   │   └── UserInput
│   │       ├── Loader.vue
│   │       ├── Search.vue
│   │       └── SubRedditTitle.vue
│   ├── main.js
│   ├── parsers
│   │   ├── analytics.js
│   │   └── parser.js
│   ├── plugins
│   │   └── vuetify.js
│   ├── router
│   │   └── index.js
│   └── views
│       └── Dashboard.vue
└── vue.config.js
```
