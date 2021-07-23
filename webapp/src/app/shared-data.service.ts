import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  showSideNav!: Boolean;
  constructor() { }
}
