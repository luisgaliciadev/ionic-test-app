import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  AvailableResult,
  BiometryType,
  NativeBiometric,
} from 'capacitor-native-biometric';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup = {} as FormGroup;
  credentials = {
    username: '',
    password: '',
  };
  constructor(
    private formBuild: FormBuilder,
    private nav: NavController // private storage: Storage
  ) {}

  ngOnInit() {
    this.buildFormLogin();
    this.getLogin();
    // this.performBiometricVerification();
  }

  buildFormLogin() {
    this.formLogin = this.formBuild.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async login() {
    const infoLogin = {
      username: 'user@ionic.com',
      password: 'Ionic123',
    };
    this.credentials = {
      username: this.formLogin.controls['username'].value,
      password: this.formLogin.controls['password'].value,
    };

    if (this.credentials.username !== infoLogin.username) {
      alert('username error');
      return;
    }
    if (this.credentials.password !== infoLogin.password) {
      alert('password error');
      return;
    }

    const login = JSON.stringify(this.credentials);
    await Storage.set({ key: 'login', value: login });
    this.setCredential(this.credentials.username, this.credentials.username);
    this.nav.navigateRoot(['home']);
  }

  async performBiometricVerification() {
    try {
      const credentials = await NativeBiometric.getCredentials({
        server: 'www.example.com',
      });
      const result = await NativeBiometric.isAvailable();
      if (!result.isAvailable) return;
      // const isFaceID = result.biometryType == BiometryType.FACE_ID;
      // console.log({ isFaceID });
      const verified = await NativeBiometric.verifyIdentity({
        reason: 'For easy log in',
        title: 'Log in',
        subtitle: 'Maybe add subtitle here?',
        description: 'Maybe a description too?',
      })
        .then(() => true)
        .catch(() => false);

      if (!verified) {
        return;
      }
      this.credentials = {
        username: credentials.username,
        password: credentials.password,
      };
      console.log({ credentials });
      this.formLogin.controls['username'].setValue(this.credentials.username);
      this.formLogin.controls['password'].setValue(this.credentials.password);
      this.login();
    } catch (error) {
      console.log({ error });
      return;
    }
  }

  async setCredential(username: string, password: string) {
    // Save user's credentials
    NativeBiometric.setCredentials({
      username,
      password,
      server: 'www.example.com',
    }).then();
  }

  async deleteCredential() {
    // Delete user's credentials
    NativeBiometric.deleteCredentials({
      server: 'www.example.com',
    });
    await Storage.remove({ key: 'login' });
  }

  // storage
  async getLogin() {
    const { value }: any = await Storage.get({ key: 'login' });
    if (!value) return;
    this.credentials = {
      username: JSON.parse(value).username,
      password: JSON.parse(value).password,
    };
    if (this.credentials.username) {
      this.formLogin.controls['username'].setValue(this.credentials.username);
      this.setCredential(this.credentials.username, this.credentials.password);
    }
    this.performBiometricVerification();
  }
}
