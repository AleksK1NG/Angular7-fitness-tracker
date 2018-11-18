import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  onLogout() {
    this.authService.logout();
    this.onClose();
  }
  ngOnInit() {
    this.isAuth$ = this.store.pipe(select(fromRoot.geIsAuth));
    // this.isAuth$ = this.store.select(fromRoot.geIsAuth);
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
