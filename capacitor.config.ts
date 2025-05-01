
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5a44d59c9ea94bda8c056e29767a0ad5',
  appName: 'emoji-tic-tac-toe-arena',
  webDir: 'dist',
  server: {
    url: 'https://5a44d59c-9ea9-4bda-8c05-6e29767a0ad5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#7e22ce",  // Matching the primary purple color
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
    },
  }
};

export default config;
