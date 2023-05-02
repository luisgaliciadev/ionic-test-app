import { Component } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
// import { FirebaseDynamicLinks } from '@pantrist/capacitor-firebase-dynamic-links';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    // this.listenToDeepLinkOpen();
  }

  // listenToDeepLinkOpen() {
  //   FirebaseDynamicLinks.addListener('deepLinkOpen', (data) => {
  //     console.log(data);
  //   });
  // }
  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      console.log({ event });
      // this.zone.run(() => {
      //     // Example url: https://beerswift.app/tabs/tab2
      //     // slug = /tabs/tab2
      //     const slug = event.url.split(".app").pop();
      //     if (slug) {
      //         this.router.navigateByUrl(slug);
      //     }
      //     // If no match, do nothing - let regular routing
      //     // logic take over
      // });
    });
  }
}
