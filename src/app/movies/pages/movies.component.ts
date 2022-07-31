import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Movie } from 'src/app/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { environment } from 'src/environments/environment';
import { MoviesService } from '../../core/services/movies.service';
import { ContentHeaderService } from '../../core/services/content-header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  totalRecords;
  movies:Movie[];
  
  @ViewChild('dt1') dt: Table | undefined;

  loading=true;

  constructor(private moviesService:MoviesService,private messageService: MessageService,private contentHeaderService:ContentHeaderService, private confirmationService:ConfirmationService, private loadingService:LoadingService, private router:Router) { }

  ngOnInit(): void {
    this.contentHeaderService.setMainHeaderTitle("إدارة الأفلام")

    this.getMovies();
  }

  getMovies(){
    this.moviesService.getMovies().subscribe(
      data=>{
        this.loading=false;


        this.movies=data;
        this.movies.map(movie=> movie.image=environment.baseImagesUrl+movie.image)
        this.totalRecords=this.movies.length;
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

  deleteMovie(id) {
    this.confirmationService.confirm({
        message: 'هل انت متاكد انك تريد حذف هذا القيلم؟',
        accept: () => {
          this.moviesService.DeleteMovie(id).subscribe(
            data=>{
              this.loadingService.hide();

              this.messageService.add({severity:'success', summary: 'حذف الفيلم ', detail: 'تم حذف الفيلم  بنجاح', life:2000});
              
              this.getMovies();
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
