import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteGuardService } from 'src/app/services/route-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  role: any;
  userEmail: any;

  constructor(
    private router: Router,
    private routeGuard: RouteGuardService
  ) {}

  ngOnInit(): void {
    this.role = this.routeGuard.getRole();
    this.userEmail = this.routeGuard.getEmail();
  }

  openChangePassword() {
    this.router.navigate(['/cafe/change-password']);
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
