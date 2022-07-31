import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../../core/services/content-header.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private contentHeaderService:ContentHeaderService) { }

  ngOnInit(): void {
    this.contentHeaderService.setMainHeaderTitle(" الإعدادات")

  }

}
