import { Component, OnInit } from '@angular/core';
import { FirebaseDynamicLinks } from '@pantrist/capacitor-firebase-dynamic-links';
import { FirebaseRemoteConfig } from '@capacitor-firebase/remote-config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {
    this.listenToDeepLinkOpen();
    this.getString();
    // this.getNumber();
  }
  ngOnInit(): void {}

  listenToDeepLinkOpen() {
    FirebaseDynamicLinks.addListener('deepLinkOpen', (data) => {
      console.log('Dynamic links data', data);
    });
  }

  // activate = async () => {
  //   await FirebaseRemoteConfig.activate();
  //   // this.getString();
  //   this.getNumber();
  // };

  fetchAndActivate = async () => {
    FirebaseRemoteConfig.fetchAndActivate().then(() => {
      console.log('hola');
      console.log('remote config version app: ', this.getString());
      console.log('getNumber: ', this.getNumber());
    });
  };

  async getString() {
    // FirebaseRemoteConfig.getString({
    //   key: 'VERSION_APP',
    // }).then((res) => {
    //   console.log('res********', res.value);
    //   return res.value;
    // });
    const value = await FirebaseRemoteConfig.getString({
      key: 'VERSION_APP',
    });
    return value;
  }

  getNumber = async () => {
    const { value, source } = await FirebaseRemoteConfig.getNumber({
      key: 'code_app',
    });
    return value;
    // FirebaseRemoteConfig.getNumber({ key: 'CODE_APP' })
    //   .then((res) => {
    //     console.log('getNumber CODE_APP', res.value);
    //     return res.value;
    //   })
    //   .catch((error) => console.log(error));
  };

  fetchConfig = async () => {
    const config = await FirebaseRemoteConfig.fetchConfig({
      minimumFetchIntervalInSeconds: 1200,
    });
  };
}
