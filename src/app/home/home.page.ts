import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  countries = [];

  constructor(private dataService: DataService ,
              private loadingController: LoadingController
              ) {}

  ngOnInit() {
    this.dataService.clientState().subscribe(ready => {
      if (ready) {
        this.loadAllCountries();
      }
    })
  }

  async loadAllCountries() {
    console.log('load now');
    const loading = await this.loadingController.create({
      message: 'Loading countries...',
    });
    await loading.present();

    this.dataService.getAllCountries().subscribe(countries => {
      console.log('countries: ', countries);
      this.countries = countries;
      loading.dismiss();
    })
  }
}
