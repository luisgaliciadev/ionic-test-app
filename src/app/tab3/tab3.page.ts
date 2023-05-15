import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapType, Marker } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  @ViewChild('map') mapRef: ElementRef<HTMLElement> | undefined;
  map: google.maps.Map | undefined;
  googleMap: GoogleMap | undefined;
  // map: any;
  coordinates = {
    latitude: 33.6,
    longitude: -117.9,
  };

  constructor() {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    setTimeout(async () => {
      this.printCurrentPosition();
    }, 500);
  }

  ionViewWillLeave() {
    this.googleMap?.removeAllMapListeners();
    this.googleMap?.destroy();
    this.googleMap = undefined;
  }

  ngOnDestroy() {
    this.googleMap?.removeAllMapListeners();
    this.googleMap?.destroy();
    this.googleMap = undefined;
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates) {
      this.coordinates = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      };
    }
    this.createMap();
  };

  async createMap() {
    this.googleMap = await GoogleMap.create({
      id: 'my-native-map',
      element: this.mapRef?.nativeElement!,
      apiKey: 'AIzaSyCaHIvJIrK6Z9Yh1OEgi_-WMltcoZhV0hw',
      forceCreate: true,
      config: {
        center: {
          lat: this.coordinates.latitude,
          lng: this.coordinates.longitude,
        },
        zoom: 8,
      },
    });

    console.log(this.googleMap);

    this.googleMap.enableTrafficLayer(true);
    this.googleMap.enableIndoorMaps(true);
    // this.googleMap.setMapType(MapType.Normal);
    this.googleMap.enableCurrentLocation(true);
    this.googleMap.enableAccessibilityElements(true);
    // this.googleMap.setOnCameraMoveStartedListener();
    // this.map = new google.maps.Map(
    //   document.getElementById('map') as HTMLElement,
    //   {
    //     zoom: 8,
    //     center: {
    //       lat: this.coordinates.latitude,
    //       lng: this.coordinates.longitude,
    //     },
    //   }
    // );

    // this.googleMap.get

    this.addMarker();
  }

  async addMarker() {
    // const contentString =
    //   '<div id="content">' +
    //   '<div id="siteNotice">' +
    //   '</div>' +
    //   '<h1 id="firstHeading" class="firstHeading">Tu Posición</h1>' +
    //   '<div id="bodyContent">' +
    //   `<p><b>Dirección: </b>` +
    //   `<p><b>Coordenadas: </b>` +
    //   '<br>' +
    //   `Latitude: ${this.coordinates.latitude}` +
    //   '<br>' +
    //   `Longitud: ${this.coordinates.latitude}` +
    //   '</div>' +
    //   '</div>';
    // const infowindow = new google.maps.InfoWindow({
    //   content: contentString,
    //   ariaLabel: 'Uluru',
    // });
    // const marker = new google.maps.Marker({
    //   position: {
    //     lat: this.coordinates.latitude,
    //     lng: this.coordinates.longitude,
    //   },
    //   map: this.map,
    //   title: 'Tu Posición',
    // });
    // marker.addListener('click', () => {
    //   infowindow.open({
    //     anchor: marker,
    //     map: this.map,
    //   });
    // });
    const marker = await this.googleMap?.addMarker({
      coordinate: {
        lat: this.coordinates.latitude,
        lng: this.coordinates.longitude,
      },
      title: 'Mi Ubicación',
      snippet: `lt:${this.coordinates.latitude} / lg:${this.coordinates.longitude}`,
    });
  }
}
