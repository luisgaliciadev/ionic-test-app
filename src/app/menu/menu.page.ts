import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menus = [
    {
      icon: 'home-sharp',
      name: 'Home',
      redirectTo: '/home/tab1',
    },
    {
      icon: 'scan-sharp',
      name: 'QR/BAR code scan',
      redirectTo: '/home/tab2',
    },
    {
      icon: 'map-sharp',
      name: 'Maps',
      redirectTo: '/home/tab3',
    },
  ];

  constructor(public menuCtrl: MenuController) {}

  ngOnInit() {}
}
