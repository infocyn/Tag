import axios from 'axios';

// Since direct scraping is unreliable and against terms of service,
// we'll use a mock API for demonstration purposes
// In a production app, you would use official APIs or a backend service

const API_DELAY = 800; // Simulate network delay

// Mock data
const MOCK_TWITTER_TRENDS = [
  "#Programming", "#JavaScript", "#React", "#WebDev", 
  "#CodeNewbie", "#100DaysOfCode", "#AI", "#MachineLearning",
  "#Python", "#DataScience", "#Cybersecurity", "#TechNews"
];

const MOCK_INSTAGRAM_TRENDS = [
  "#Photography", "#InstaGood", "#Love", "#Fashion",
  "#Beautiful", "#Happy", "#Cute", "#Travel",
  "#Art", "#Photooftheday", "#Nature", "#Picoftheday"
];

const MOCK_TIKTOK_TRENDS = [
  "#FYP", "#ForYou", "#Viral", "#TikTokDance",
  "#Trending", "#Comedy", "#Funny", "#Dance",
  "#Challenge", "#Music", "#Memes", "#Tutorial"
];

// Helper to simulate API calls
const simulateApiCall = async (data) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, API_DELAY);
  });
};

// Add random growth/decline percentages to hashtags
const addTrendData = (trends) => {
  return trends.map(hashtag => {
    const change = (Math.random() * 20 - 5).toFixed(1); // -5% to +15%
    const volume = Math.floor(Math.random() * 100000);
    return {
      hashtag,
      change: parseFloat(change),
      volume,
      sentiment: Math.random() * 100
    };
  });
};

// Generate historical data for a trend (last 7 days)
const generateHistoricalData = (hashtag) => {
  const data = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      volume: Math.floor(10000 + Math.random() * 90000),
      sentiment: 40 + Math.random() * 20
    });
  }
  
  return data;
};

// API functions
export const fetchTwitterTrends = async () => {
  return simulateApiCall(addTrendData(MOCK_TWITTER_TRENDS));
};

export const fetchInstagramTrends = async () => {
  return simulateApiCall(addTrendData(MOCK_INSTAGRAM_TRENDS));
};

export const fetchTikTokTrends = async () => {
  return simulateApiCall(addTrendData(MOCK_TIKTOK_TRENDS));
};

export const fetchAllTrends = async () => {
  const [twitter, instagram, tiktok] = await Promise.all([
    fetchTwitterTrends(),
    fetchInstagramTrends(),
    fetchTikTokTrends()
  ]);
  
  return {
    twitter,
    instagram,
    tiktok
  };
};

export const fetchTrendDetails = async (hashtag) => {
  // Simulate API call for trend details
  return simulateApiCall({
    hashtag,
    volume: Math.floor(Math.random() * 100000),
    growth: (Math.random() * 20 - 5).toFixed(1),
    sentiment: 40 + Math.random() * 20,
    platforms: {
      twitter: Math.random() > 0.3,
      instagram: Math.random() > 0.3,
      tiktok: Math.random() > 0.3,
    },
    demographics: {
      age: {
        "13-17": Math.floor(Math.random() * 20),
        "18-24": Math.floor(Math.random() * 30),
        "25-34": Math.floor(Math.random() * 30),
        "35-44": Math.floor(Math.random() * 20),
        "45+": Math.floor(Math.random() * 20),
      },
      gender: {
        male: Math.floor(Math.random() * 60) + 20,
        female: Math.floor(Math.random() * 60) + 20,
        other: Math.floor(Math.random() * 10),
      }
    },
    history: generateHistoricalData(hashtag),
    relatedHashtags: Array(5).fill().map(() => {
      const allTags = [...MOCK_TWITTER_TRENDS, ...MOCK_INSTAGRAM_TRENDS, ...MOCK_TIKTOK_TRENDS];
      return allTags[Math.floor(Math.random() * allTags.length)];
    })
  });
};