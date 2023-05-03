import { Component } from '@angular/core';
import {
  AvailableResult,
  BiometryType,
  NativeBiometric,
} from 'capacitor-native-biometric';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  credentials: any;
  constructor() {
    this.performBiometricVerificatin();
  }

  async performBiometricVerificatin() {
    const result = await NativeBiometric.isAvailable();

    console.log({ result });

    if (!result.isAvailable) return;

    this.setCredential();

    const isFaceID = result.biometryType == BiometryType.FACE_ID;

    console.log(isFaceID);

    const verified = await NativeBiometric.verifyIdentity({
      reason: 'For easy log in',
      title: 'Log in',
      subtitle: 'Maybe add subtitle here?',
      description: 'Maybe a description too?',
    })
      .then(() => true)
      .catch(() => false);

    if (!verified) {
      this.deleteCredential();
      return;
    }

    this.credentials = await NativeBiometric.getCredentials({
      server: 'www.example.com',
    });
    console.log(this.credentials);
  }

  setCredential() {
    // Save user's credentials
    NativeBiometric.setCredentials({
      username: 'username',
      password: 'password',
      server: 'www.example.com',
    }).then();
  }

  deleteCredential() {
    // Delete user's credentials
    NativeBiometric.deleteCredentials({
      server: 'www.example.com',
    });
    this.credentials = null;
  }

  // checkCredential() {
  //   NativeBiometric.isAvailable().then((result: AvailableResult) => {
  //     const isAvailable = result.isAvailable;
  //     alert('RESULT ' + JSON.stringify(result));
  //     // const isFaceId=result.biometryType==BiometryType.FACE_ID;
  //     // const isFaceId = result.biometryType == BiometryType.FACE_ID;

  //     if (isAvailable) {
  //       // Get user's credentials
  //       NativeBiometric.getCredentials({
  //         server: 'www.example.com',
  //       }).then((credentials) => {
  //         alert('CREDENTIAL ' + JSON.stringify(credentials));
  //         // Authenticate using biometrics before logging the user in
  //         NativeBiometric.verifyIdentity({
  //           reason: 'For easy log in',
  //           title: 'Log in',
  //           subtitle: 'Maybe add subtitle here?',
  //           description: 'Maybe a description too?',
  //         })
  //           .then(() => {
  //             //     // Authentication successful
  //             alert('SUCCESS!!');
  //             //     // this.login(credentials.username, credentials.password);
  //           })
  //           .catch((err) => {
  //             //   // Failed to authenticate
  //             alert('FAIL!');
  //           });
  //       });
  //     }
  //   });
  // }
}
