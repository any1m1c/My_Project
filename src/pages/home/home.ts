import { NavController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage } from 'ionic-angular';

declare var google;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;  

  start = 'Rua 5, il';
  end = 'Rua 5, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;



  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
  
  }
  ionViewDidLoad(){
    this.loadMap();
  }
  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {
    
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }
addMarker(){

  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });

  let content = "<h4>Local atual! </h4>";

  this.addInfoWindow(marker, content);
}

addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
});

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
}
}