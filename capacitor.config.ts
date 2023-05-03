import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.luisgaliciadev.ionictest',
  appName: 'ionicTests',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.68:8101',
    cleartext: true,
  },
};

export default config;
