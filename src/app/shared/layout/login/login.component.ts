import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NotEmpty } from '../../validators';
import { UserForAuthentication } from '../../../core/models/user-for-authentication';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {

  private returnUrl: string;

  loginForm: FormGroup;

  userForAuthentication:UserForAuthentication;

  loading$ = this.loadingService.loading$;

  constructor(private formBuilder: FormBuilder, private usersService:UsersService,private loadingService:LoadingService,private route: ActivatedRoute, private router:Router,private messageService: MessageService,) { 

    this.loginForm= this.formBuilder.group({
      email:['',[Validators.required,  NotEmpty, Validators.email]],
      password: ['',[Validators.required,  NotEmpty]],
    })
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get email(){
    return this.loginForm.get("email")
  }

  get password(){
    return this.loginForm.get("password")
  }

  onSubmit(){
    this.loadingService.show();

    this.userForAuthentication=new UserForAuthentication(this.loginForm.value);

    this.usersService.login(this.userForAuthentication).subscribe(
      data=>{
        this.loadingService.hide();


        this.messageService.add({severity:'success', summary: 'تسجيل الدخول', detail: ' تم تسجيل الدخول بنجاح   ', life:2000});

        setTimeout(() => {
          this.router.navigate([this.returnUrl]);

        }, 2000);
      },
      error=>{
        this.loadingService.hide();
        this.messageService.add({severity:'error', summary: '  خطأ', detail: error, life:2000});

        
      });
    
  }
}