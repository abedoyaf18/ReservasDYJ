import { Component, OnInit } from '@angular/core';
import { RegisterUser } from './register-user';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerUser:RegisterUser = new RegisterUser();

  constructor(private registerService:RegisterService,private router: Router){}
  //,private toastr:ToastrService
  ngOnInit(): void {

  }


  create(): void {
    console.log(this.registerUser);
    this.registerService.create(this.registerUser).subscribe(
      () => {
        //this.toastr.success('¡Guardado exitosamente!', 'Confirmación');
        this.router.navigate(['/login']);
      },
      (error) =>{
        console.error('Error al crear usuario',error);
      }
    );
  }

    pdfUrl: string = '/Docs/Política de Privacidad inventapp.pdf';

}
