import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { UserForRegister } from '../../../core/models/user-for-register';
import { User } from '../../../core/models/user';
import { NotEmpty ,PasswordConfirmation} from '../../validators';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  userForRegister:UserForRegister;

  user:User;

  loading$ = this.loadingService.loading$;

  constructor(private formBuilder: FormBuilder, private usersService:UsersService, private loadingService:LoadingService, private router:Router,private messageService: MessageService) {

    
  }

  
  ngOnInit(): void {       

    //already authenticated
    if(this.usersService.isAuthenticated())
      this.router.navigateByUrl("/")
      
    this.registerForm= this.formBuilder.group({
      name:['',[Validators.required,  NotEmpty]],
      email:['',[Validators.required,  NotEmpty, Validators.email]],
      password: ['',[Validators.required,  NotEmpty, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{6,}$")]],
      passwordConfirm: [''],
    })

    this.passwordConfirm.setValidators([Validators.required,
      PasswordConfirmation(this.password)]);
      
  }

  get name(){
    return this.registerForm.get("name")
  }

  get email(){
    return this.registerForm.get("email")
  }

  get password(){
    return this.registerForm.get("password")
  }

  get passwordConfirm(){
    return this.registerForm.get("passwordConfirm")
  }


  onSubmit()
  {
    this.loadingService.show();

    this.userForRegister=new UserForRegister(this.registerForm.value);

    this.usersService.register(this.userForRegister).subscribe(
      data=>{
        this.loadingService.hide();

        this.user=data;

        this.messageService.add({severity:'success', summary: 'تسجيل حساب جديد', detail: 'تم تسجيل الحساب الجديد بنجاح', life:3000});

        setTimeout(() => {
          this.router.navigate(['login']);

        }, 3000);
      },
      error=>{
        this.loadingService.hide();
        this.messageService.add({severity:'error', summary: '  خطأ', detail: error, life:2000});

        
      });

  }

}
