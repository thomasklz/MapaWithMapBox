import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitud:any;
  longitud:any;
  constructor() {}

  //obtener ubicacion actual del mapa
  printCurrentPosition = async () => {
      const coordinates:any = await Geolocation.getCurrentPosition();
      this.latitud= coordinates.coords.latitude;
      this.longitud= coordinates.coords.longitude;
      this.cargarMapa();
  };

  ngOnInit(){
    this.printCurrentPosition();
  }

  //cargar mapa
  cargarMapa(){
      const map = new mapboxgl.Map({
        accessToken:
          'pk.eyJ1IjoidGhvbWFza2x6IiwiYSI6ImNsM3VibWJwbTI4emkzZXBlamVjOHp0Z2YifQ.QhFxYxdIC2m4vGlEkMqrow', // tu clave de API de mapbox
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/navigation-day-v1', // style URL
          center: [this.longitud,this.latitud], // starting position [lng, lat]
          zoom: 14, // starting zoom
        });
        map.on('load', function() {
          map.resize();
        })

        //agregar controler al mapa
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(new mapboxgl.FullscreenControl());

        //ubicacion actual
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        //disenado marker
        var el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = 'url(../../assets/alfiler.png)';
            el.style.width = '32px';
            el.style.height = '32px';
       
          //mensaje Popup
        const popup = new mapboxgl.Popup({ offset: 25 })
                    .setText(
                          'Construction on the Washington Monument began in 1848.'
                    );
                          
       
          //agregar marker
         const marker = new mapboxgl.Marker(el)
             .setLngLat([this.longitud,this.latitud])
             .setPopup(popup)
             .addTo(map);
             
            

  }

}
