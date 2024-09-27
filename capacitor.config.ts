import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'petMap',
  webDir: 'www',
  server: {
    androidScheme: "https"
  },
  plugins: {
    "GoogleAuth": {
      "scopes": [
        "profile",
        "email"
      ],
      "serverClientId": "REPLACEME.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
};

export default config;
