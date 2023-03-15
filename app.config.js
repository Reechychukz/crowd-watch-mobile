import 'dotenv/config';

export default {
  "expo": {
    "name": "crowd-watch-mobile",
    "slug": "crowd-watch-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow Crowd Watch to access your photos",
          "cameraPermission": "Allow Crowd Watch to access your camera",
          "microphonePermission": "Allow Crowd Watch to access your microphone"
        }
      ]
    ],
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "host.expo.exponent"
    },
    "android": {
      "permissions": [],
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "host.exp.exponent"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    }

  }
}
