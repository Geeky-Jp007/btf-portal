import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public router: Router) { }

  canActivate(): boolean {
    if (!firebase.auth().currentUser) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
