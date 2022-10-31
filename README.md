# UnwrapReddit
Motivation: Understand and _unwrap_ the mystery behind the **Analytics of Reddit Posts** using the Reddit API and Vue Java Script.

## Try for yourself! 
Search any subreddit name and instantly get feedback on the best time, day of week, and title to maximize reception of your Reddit post based on **real, live SubReddit data**.

Live Deploy and Hosting through Firebase: http://bit.ly/redditAPI or https://unwrap-reddit.web.app

## Frameworks Used
**Vue JS** for Dynamic Component Rendering

**Vuetify JS** for simple styling following Google's Material Design philosophy

**JavaScript** for parsing(scraping) the Reddit API with Snoowrap Reddit API wrapper

### Project Engineering Notebook
Handwritten documentation and brainstorming can be found here: 

### Project File Tree
Using the Vue Java Script (Vue JS) framework instead of pure HTML and CSS condenses the file tree by allowing dynamic rendering of content and modualarizing repetitive features into reusable Child Components.

Components are also lazy loaded to preserve web app efficiency. Optimized sorting algorithms through use of Arrays and JavaScript Objects reduces the time complexity of the Analytics algorithms.
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
