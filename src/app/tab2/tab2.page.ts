import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  isScanning = false;
  scanData: any = null;
  constructor() {
    this.checkPer();
  }

  ionViewDidEnter() {
    this.scanData = null;
  }

  ionViewWillLeave() {
    this.stopScan();
  }

  checkPer = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });
    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
  };

  async start() {
    this.isScanning = true;
    this.scanData = {
      data: null,
    };
    BarcodeScanner.hideBackground();
    document.body.classList.add('qrscanner');
    document.querySelector('body')!.classList.add('scanner-active');
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      this.scanData = result.content;
    }
    document.querySelector('body')!.classList.remove('scanner-active');
    this.isScanning = false;
  }

  async stopScan() {
    document.querySelector('body')!.classList.remove('scanner-active');
    this.isScanning = false;
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
}
