import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Meteo, MeteoInstantDataDetails } from './meteo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  vissWeath: any[] = [];

  weatherNow?: MeteoInstantDataDetails

  currentLocation = {
    longitude: 0,
    latitude: 0,
  }

  constructor() {
    navigator.geolocation
      .getCurrentPosition((x) => {
        this.currentLocation.latitude = x.coords.latitude;
        this.currentLocation.longitude = x.coords.longitude;
        this.findMeoteoData(this.currentLocation.longitude, this.currentLocation.latitude);
        this.findLocationData(this.currentLocation.longitude, this.currentLocation.latitude)
      });
  }

  // showDirection(val:number) {
  //   if(val > 315 && val < 45){
  //     return "Z"
  //   }else if(val < 225 && val > 135){
  //     return "S"
  //   } else if(val <= 315 && val >= 135){
  //     return "R"
  //   }else {
  //     return "A"
  //   }
  // }

  ngOnInit(): boolean {
    return true;
  }

  ngAfterViewInit(): void {
  }

  openWeather(weather: any) {
    alert(weather.data.instant.details.air_temperature);
  }

  private async findMeoteoData(longitude: number, latitude: number): Promise<void> {
    const dataStream = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);
    const data: Meteo = await dataStream.json();
    const today = data.properties.timeseries[0].data.instant.details;
    this.vissWeath = data.properties.timeseries;
    this.weatherNow =today;
  }

  private async findLocationData(longtitude:number,latitude:number) {
    const dataStream = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=-${latitude}%2C${longtitude}`);
    const data = await dataStream.json();
    console.log(data)
  }
}

