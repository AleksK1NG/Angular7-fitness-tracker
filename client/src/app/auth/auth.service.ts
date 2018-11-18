import { Injectable } from '@angular/core';
import { AuthData } from './auth-data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authChange = new Subject<boolean>();
  // private isAuthenticated = false;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated(true));
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        // this.authChange.next(false);
        this.router.navigate(['/login']);
        // this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch(err => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(err.message, null, 3000);
      });
  }

  login(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        console.log('faAuth result ', result);
      })
      .catch(err => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(err.message, null, 3000);
      });
  }
  logout(): void {
    this.afAuth.auth.signOut();
  }
  // isAuth(): boolean {
  //   return this.isAuthenticated;
  // }
}
