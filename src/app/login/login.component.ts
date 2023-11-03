import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  datos = {
    email: '',
    password: ''
  };
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.router.navigate(['/home']);
    /* this.authService.login(this.datos).subscribe(
      
      (response) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = 'Error de autenticación. Verifica tus credenciales.';
      }
    ); */
  }
}