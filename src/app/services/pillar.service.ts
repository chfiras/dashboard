import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PillarService {

  constructor(private http: HttpClient) { }


  getPillarData(id : string) {
    return this.http.get<any>(`assets/data/${id}.json`)
    .toPromise()
    .then(data => { return data; });
}
}
