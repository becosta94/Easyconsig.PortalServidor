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
      API_URL: isProduction
        ? "https://production.up.railway.app/api"
        : isHomolog
          ? "http://192.168.100.5:5235/api"
          : "http://localhost:3000",
      ENV: isProduction ? "production" : isHomolog ? "homolog" : "development",
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
