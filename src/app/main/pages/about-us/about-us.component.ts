import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from 'src/app/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private contentHeaderService:ContentHeaderService) { }

  ngOnInit(): void {
    this.contentHeaderService.setMainHeaderTitle("حول");
  }

}
