import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as fromRoot from '../app.reducer';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(fromRoot.geIsAuth),
      take(1)
    );
    // return this.store.select(fromRoot.geIsAuth);
  }

  canLoad(route: Route) {
    // return this.store.select(fromRoot.geIsAuth);
    return this.store.pipe(
      select(fromRoot.geIsAuth),
      take(1)
    );
  }
}
