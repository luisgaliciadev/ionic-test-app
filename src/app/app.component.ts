import { Component } from '@angular/core';
import { FirebaseDynamicLinks } from '@pantrist/capacitor-firebase-dynamic-links';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.listenToDeepLinkOpen();
  }

  listenToDeepLinkOpen() {
    FirebaseDynamicLinks.addListener('deepLinkOpen', (data) => {
      console.log('Dynamic links data', data);
    });
  }
}
