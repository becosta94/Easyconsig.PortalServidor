import 'dotenv/config';

const isProduction = process.env.APP_ENV === 'production';
const isHomolog = process.env.APP_ENV === 'homolog';
const isDevelopment = !isProduction && !isHomolog;

export default () => ({
  expo: {
    name: isHomolog ? "EasyConsig HML" : "EasyConsig",
    slug: "EasyConsig",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "easyconsigmobile",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.EasyConsigMobile"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    experiments: {
      typedRoutes: true
    },
    extra: {
      API_URL: "https://apiapp.easyconsig.com.br/api",
      ENV:  "production",
      eas: {
        "projectId": "fb4be8b3-32b4-4388-a83b-423a176f2561"
      }
    },
    doctor: {
      reactNativeDirectoryCheck: {
        listUnknownPackages: false
      }
    },
    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash.png",
          imageWidth: 100
        }

      ]
    ]
  }
});
