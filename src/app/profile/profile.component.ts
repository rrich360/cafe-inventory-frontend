import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string = '';
  role: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return;
    }
    try {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      this.username = payload.sub || 'User';
      this.role = payload.role || 'user';
    } catch (e) {
      this.router.navigate(['/']);
    }
  }

  onMenuHomeClick() {
    this.router.navigateByUrl('/home');
  }

  goToDashboard() {
    this.router.navigate(['/cafe/dashboard']);
  }

}
