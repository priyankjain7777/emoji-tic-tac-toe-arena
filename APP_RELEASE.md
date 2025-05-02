
# Trump vs Modi Tic Tac Toe - App Store & Play Store Release Guide

This guide contains instructions for building and publishing the Trump vs Modi Tic Tac Toe game to the App Store and Play Store.

## Prerequisites

- **For iOS:** 
  - Mac computer with Xcode 13+ installed
  - Apple Developer account ($99/year)
  - [Apple App Store Connect](https://appstoreconnect.apple.com/) access

- **For Android:** 
  - [Android Studio](https://developer.android.com/studio) installed
  - Google Play Developer account ($25 one-time fee)
  - [Google Play Console](https://play.google.com/console/) access

## Preparing Your App for Release

### Step 1: Clone and Set Up Your Project

```bash
# Clone your repository from GitHub
git clone <YOUR_REPO_URL>
cd trump-vs-modi-tic-tac-toe

# Install dependencies
npm install

# Build the web app
npm run build
```

### Step 2: Set Up Capacitor Native Projects

```bash
# Add iOS and Android platforms
npx cap add ios
npx cap add android

# Sync the web code to the native projects
npx cap sync
```

### Step 3: Generate App Icons and Splash Screens

We recommend using a tool like Capacitor's official [capacitor-assets](https://github.com/ionic-team/capacitor-assets) to generate all required icons and splash screens:

```bash
npm install --save-dev @capacitor/assets
npx capacitor-assets generate
```

## iOS App Store Release

### Step 1: Update App Information in Xcode

1. Open the iOS project in Xcode:
   ```bash
   npx cap open ios
   ```

2. In Xcode, select your project in the Navigator, then:
   - Update the Bundle Identifier to match your app ID
   - Set the Version and Build numbers
   - Configure Signing & Capabilities with your Apple Developer account

### Step 2: Create App Store Listing

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Create a new app entry with the same bundle identifier
3. Fill in all required metadata:
   - App name: Trump vs Modi Tic Tac Toe
   - Description: Play Tic Tac Toe as Trump vs Modi with custom game sounds and animations!
   - Keywords: tic tac toe, trump, modi, game, puzzle, strategy
   - Screenshots (for all required device sizes)
   - App preview videos (optional)
   - Privacy policy URL
   - Support URL

### Step 3: Build and Upload

1. In Xcode, select Product > Archive
2. Once archiving completes, click "Distribute App"
3. Select "App Store Connect" and follow the prompts
4. Submit for review in App Store Connect

## Google Play Store Release

### Step 1: Configure Your Android Project

1. Open the Android project:
   ```bash
   npx cap open android
   ```

2. Update the app/build.gradle file:
   - Set versionCode and versionName
   - Configure signing config for release

### Step 2: Create Signing Key

```bash
keytool -genkey -v -keystore trump-modi-tictactoe.keystore -alias trump-modi-tictactoe -keyalg RSA -keysize 2048 -validity 10000
```

### Step 3: Build Signed APK/Bundle

1. In Android Studio, select Build > Generate Signed Bundle/APK
2. Choose Android App Bundle for Google Play
3. Use the keystore you generated
4. Build the bundle

### Step 4: Create Google Play Listing

1. Go to [Google Play Console](https://play.google.com/console/)
2. Create a new app
3. Fill in all required metadata:
   - App name: Trump vs Modi Tic Tac Toe
   - Description: Engage in strategic Tic Tac Toe battles as Trump vs Modi with custom sounds and animations!
   - Short description: A fun Trump vs Modi themed Tic Tac Toe game
   - Screenshots (for phone, tablet, etc.)
   - Feature graphic and icon
   - Content rating questionnaire
   - Privacy policy URL

### Step 5: Release to Google Play

1. Upload your signed AAB file
2. Complete the store listing
3. Set countries/regions for distribution
4. Choose release track (internal test, closed testing, open testing, or production)
5. Review and roll out the release

## Updating Your App

When you need to update your app:

1. Make your code changes
2. Run `npm run build` to build web assets
3. Run `npx cap sync` to update native projects
4. Increment version numbers in both iOS and Android projects
5. Build new versions and submit to the stores

## App Store Optimization Tips

- Use relevant keywords in your app title and description
- Create high-quality screenshots showcasing your game
- Respond to user reviews promptly
- Update your app regularly with improvements

## Common Issues and Solutions

- **iOS Signing Issues**: Verify your provisioning profiles and certificates are valid
- **Android Version Conflicts**: Make sure all dependencies are compatible
- **Rejected from App Store**: Carefully read rejection reasons and fix accordingly
- **Performance Issues**: Test thoroughly on actual devices before release

Good luck with your app submission!
