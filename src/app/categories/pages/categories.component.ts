import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ContentHeaderService } from 'src/app/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Category } from '../../core/models/category';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  totalRecords;
  categories:Category[];
  
  @ViewChild('dt1') dt: Table | undefined;

  loading=true;

  loading$ = this.loadingService.loading$;

  constructor(private categoriesService:CategoriesService,private messageService: MessageService,private contentHeaderService:ContentHeaderService, private confirmationService:ConfirmationService, private loadingService:LoadingService, private router:Router) { }

  ngOnInit(): void {
    this.contentHeaderService.setMainHeaderTitle("إدارة التصنيفات")

    this.getCategories();
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe(
      data=>{
        this.loading=false;

        this.categories=data;
        this.totalRecords=this.categories.length;
      },
      error=>{
        this.loading=false;

        this.messageService.add({severity:'error', summary: '  خطأ', detail: error, life:2000});

      }
    )
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }

  deleteCategory(id) {
    
    this.loadingService.show();

    this.confirmationService.confirm({
        message: 'هل انت متاكد انك تريد حذف هذا التصنيف؟',
        accept: () => {
          this.categoriesService.DeleteCategory(id).subscribe(
            data=>{
              this.loadingService.hide();

              this.messageService.add({severity:'success', summary: 'حذف التصنيف ', detail: 'تم حذف التصنيف بنجاح', life:2000});
              
              this.getCategories();
            },
            error=>{
              this.loadingService.hide();
              this.messageService.add({severity:'error', summary: '  خطأ', detail: error, life:2000});
            }
          )

        }
    });

  }
}
