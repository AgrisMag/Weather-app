import { Component, Input, OnInit } from '@angular/core';
import { MeteoInstantDataDetails } from '../meteo';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
@Input() currentWeather?:MeteoInstantDataDetails;
  constructor() { }

  ngOnInit(): void {
  }

}
