import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContentHeaderService } from 'src/app/core';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {

  isBackHidden=false;
  constructor(private contentHeaderService: ContentHeaderService, private route: ActivatedRoute, private router: Router,private location: Location) { }


  mainHeaderTitle;

  ngOnInit(): void {
    
    this.location.onUrlChange( (url: string, state: unknown) => {
      if(url.toLowerCase()==="/home")
        this.isBackHidden=true
      else
        this.isBackHidden=false
    })

    this.contentHeaderService.subject$.subscribe(
      data=> {
        this.mainHeaderTitle=data;
      }
    )
  }

  navigateBack() {
    this.location.back();
  }
}