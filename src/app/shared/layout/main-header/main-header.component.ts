import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private usersService:UsersService) { }

  ngOnInit( ): void {
  }

  logout(){
    console.log("sssssssss");
    this.usersService.logout();
  }
}
