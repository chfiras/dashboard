import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PillarConfigService {

  constructor(private http: HttpClient) { }


  getPillarConfigData(id : string) {
    return this.http.get<any>(`assets/data/optionConfig${id}.json`)
    .toPromise()
    .then(data => { return data; });
}
}
