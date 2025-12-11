import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { from, map } from 'rxjs';
import { Router } from '@angular/router';


@Component({                         
  imports: [ ReactiveFormsModule ],  
  styleUrl: './login-page.scss'
})


export class LoginPageComponent {

  authService = inject(AuthService)   
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({             
    username: new FormControl(null, Validators.required),  
    password: new FormControl(null, Validators.required)
  })



  onSubmit(event: Event){

    if (this.form.valid) {           

      this.authService.login(this.form.value)
      .subscribe(res => {
        this.router.navigate([''])
      })
    }
  }

}
