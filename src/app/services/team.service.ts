import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }


  getTeam() {
    return this.http.get<any>('assets/data/team.json')
    .toPromise()
    .then(data => { return data; });
}
}
