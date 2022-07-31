import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private userService: UsersService){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (this.userService.isAuthenticated()){
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
  
}
