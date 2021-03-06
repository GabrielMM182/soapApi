import { Injectable } from "@angular/core";
import { Client, NgxSoapService } from "ngx-soap";
import { BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    client: Client;
    private clientReady = new BehaviorSubject(false);

    constructor(private soap: NgxSoapService) {
        this.soap.createClient('./assets/CountryInfoService.xml')
        .then(client => {
            console.log('cliente', client);
            this.client = client;
            this.clientReady.next(true);
        });
    }

    clientState() {
        return this.clientReady.asObservable();
    }

    getAllCountries() {
        return this.client.call('ListOfCountryNamesByName', {}).pipe(
            map(data => {
                console.log('data: ', data);
                return data.result.ListOfCountryNamesByNameResult.tCountryCodeAndName;
            })
        )
    }

    getFlagForCountry(isocde) {
        return this.client.call('CountryFlag', {sCountryISOCode: isocde}).pipe(
            map(data => {
                return data.result.CountryFlagResult;
            })
        )
    }

    getCurrencyForCountry(isocde) {
        return this.client.call('CountryCurrency', {sCountryISOCode: isocde}).pipe(
            map(data => {
                return data.result.CountryCurrencyResult;
            })
        )
    }

    getCapitalForCountry(isocde) {
        return this.client.call('CapitalCity', {sCountryISOCode: isocde}).pipe(
            map(data => {
                return data.result.CapitalCityResult;
            })
        )
    }
}