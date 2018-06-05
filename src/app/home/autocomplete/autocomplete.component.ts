import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";

// agm
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { AgmMap, AgmDataLayer } from '@agm/core';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.state';
import { ChangeLocation } from '../../redux/location/location.action';

// services
import { WeatherService } from '../../services/weather.service';
import { LangService } from '../../services/lang.service';
import { AutocompleteService } from '../../services/autocomplete.service'; 

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @ViewChild('arrow') arrow: ElementRef;

  // toggle settings map
  toggleSettingsMap: boolean = true;

  // settings map
  mapTypeId: string;
  scrollwheel: boolean;
  mapTypesArr: any = [
    { type: 'roadmap', en: 'Roadmap', uk: 'Дорожня карта', ru: 'Дорожная карта' },
    { type: 'hybrid', en: 'Hybrid', uk: 'Гібрид', ru: 'Гибрид' },
    { type: 'satellite', en: 'Satellite', uk: 'Cупутник', ru: 'Cпутник' },
    { type: 'terrain', en: 'Terrain', uk: 'Місцевість', ru: 'Местность' }
  ];
  scrollwheelsArr: any = [
    { type: true, en: 'Yes', uk: 'Так', ru: 'Да' },
    { type: false, en: 'No', uk: 'Ні', ru: 'Нет' }
  ];

  // language
  lang: string;

  // dictionary
  form: any;
  settingsMap: any;

  // location
  latitude: number;
  longitude: number;
  searchControl: FormControl;
  zoom: number;

   @ViewChild("search")
  public searchElementRef: ElementRef;

  defaultCountry: string = 'Ukraine';

  constructor(
    private weatherService: WeatherService,
    private autocompleteService: AutocompleteService,
    private langService: LangService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<AppState>
  ) {}

  ngOnInit() {

    // initialisation settingsMap
    this.initialisationSettingsMap();

    // listening language
    this.store.select('language').subscribe(res => {
      console.log('REDUX LANG ', res);
      this.lang = res.lang;
      this.langService.getDictionary(this.lang.toLocaleLowerCase()).subscribe(res => {
        this.form = res.pages.home.form;
        this.settingsMap = res.pages.home.settingsMap;
      });
    });

    // listening location
    this.store.select('location').subscribe(res => {
      console.log('REDUX LOCATION ', res);
      // set google maps defaults
      this.zoom = 14;
      this.latitude = res.lat;
      this.longitude = res.lng;
    });

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    // this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader
    .load()
    .then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['(regions)'],
        // componentRestrictions: { country: 'UA' }
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = +place.geometry.location.lat().toFixed(6);
          this.longitude = +place.geometry.location.lng().toFixed(6);
          this.zoom = 14;
          console.log('LOCATION ', place);
          console.log(this.latitude.toFixed(6));
          console.log(this.longitude.toFixed(6));
          console.log(this.zoom);

          let payload = {
            city: place.name,
            formatted_address: place.formatted_address,
            lat: +this.latitude,
            lng: +this.longitude,
            lang: this.lang
          };
          console.log('PAYLOAD ', payload);
          this.store.dispatch(new ChangeLocation(payload));
          this.weatherService.setWeather(payload);
        });
      });
    });

  }

  // set Current Position
  setCurrentPosition() {
    console.log('navigator ', navigator);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
        // console.log('YES ', position);
        // this.weatherService.geocode({
        //   lat: this.latitude,
        //   lng: this.longitude
        // }).subscribe(res => {
        //   console.log('GET MY CITY LOC ', res);
        // });
      });
    }
  }

  // scroll wheel
  onScrollwheel(obj) {
    this.scrollwheel = obj.type;
    this.autocompleteService.setSettingsMap({
      scrollwheel: this.scrollwheel,
      mapTypeId: this.mapTypeId
    });
  }

  // change mapTypeId
  onMapTypeId() {
    this.autocompleteService.setSettingsMap({
      scrollwheel: this.scrollwheel,
      mapTypeId: this.mapTypeId
    });
  }

  // toggle settings map
  onToggleSettingsMap() {
    this.toggleSettingsMap = !this.toggleSettingsMap;
  }

  // initialisation settings
  initialisationSettingsMap() {
    let settings = this.autocompleteService.getSettingsMap();
    if ( !settings ) {
      settings = {
        scrollwheel: true,
        mapTypeId: 'roadmap'
      };
      this.autocompleteService.setSettingsMap(settings);
      // settings = this.autocompleteService.getSettingsMap();
    }
    this.mapTypeId = settings.mapTypeId;
    this.scrollwheel = settings.scrollwheel;
    console.log('SETTING mapTypeId', this.mapTypeId);
  }

}
