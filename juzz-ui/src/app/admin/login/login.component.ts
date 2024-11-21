import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: LoginService,private router: Router) {}

  logiObj: any = {
    "userName": "",
    "password": ""
  };

  http= inject(HttpClient);
  // router = inject(Router);

  onLogin() {
    debugger;
    this.authService.login(this.logiObj).subscribe((res:any)=>{
      if(res.is_verified) {
        alert("Login Success");
        // const enrUserName =  this.encriptData(this.logiObj.EmailId);
        // localStorage.setItem("uName",enrUserName);
        localStorage.setItem('angular18Token',res.access_token);
        this.router.navigateByUrl('admin-transaction')
      } else {
        alert("Invalid Credentials")
      }
    })
  }
}


