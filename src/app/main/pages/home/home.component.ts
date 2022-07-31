import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Category, MoviesService } from 'src/app/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Movie } from '../../../core/models/movie';
import { environment } from '../../../../environments/environment';
import { ContentHeaderService } from '../../../core/services/content-header.service';
import { CategoriesService } from '../../../core/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  @ViewChild('pag') paginator: Paginator | undefined;

  totalRecords;
  movies:Movie[];

  loadedMovies:Movie[];

  movieCategoriesList:Category[];
  selectedCategory;

  loading$ = this.loadingService.loading$;

  constructor(private moviesService:MoviesService,private categoriesService:CategoriesService, private loadingService:LoadingService,private messageService: MessageService, private contentHeaderService:ContentHeaderService) { }

  ngOnInit(): void {
    this.contentHeaderService.setMainHeaderTitle("الصفحة الرئيسية")

    this.getMovieCategoriesList();

    this.getMovies();

    
  }


  onPageChange(event){
    this.loadingService.show();
    setTimeout(() => {
      //load data of required page
     
      this.loadedMovies = this.movies.slice(event.first, event.rows+event.first);
      //populate page of virtual cars

      this.loadingService.hide();

    }, 1000);

  }

  getMovies(){
    this.moviesService.getMovies().subscribe(
      data=>{
        this.movies=data;
        this.movies.map(movie=> movie.image=environment.baseImagesUrl+movie.image)
        this.totalRecords=this.movies.length;

        setTimeout(() => {
          this.paginator.changePage(0)
        })
      },
      error=>{
        this.loadingService.hide();
        this.messageService.add({severity:'error', summary: '  خطأ', detail: error, life:2000});

      }
    )
  }

  getMovieCategoriesList(){
    this.categoriesService.getCategories().subscribe(
      data=>{
        this.movieCategoriesList=data;
      },
      error=>{
        this.messageService.add({severity:'error', summary: '  خطأ', detail: error, life:2000});
      }
    )    
  }

  getMoviesByCategory(id){
    this.loadingService.show();

    this.moviesService.getMoviesByCategory(id).subscribe(
      data=>{
        this.loadingService.hide();
        this.movies=data;
        this.movies.map(movie=> movie.image=environment.baseImagesUrl+movie.image)
        this.totalRecords=this.movies.length;
        this.loadedMovies = this.movies.slice(this.paginator.first, this.paginator.rows+this.paginator.first);


      },
      error=>{
        this.loadingService.hide();
        this.messageService.add({severity:'error', summary: '  خطأ', detail: error, life:2000});
      }
    )    
  }

  onSelectCategory(event){
    if(event.value&& event.value.id){
      let categoryId=event.value.id;
      this.getMoviesByCategory(categoryId)
    }
  }

  clear(){
    this.getMovies();
    this.selectedCategory=0
  }


  timeSince(date:Date) {
    var today: any = new Date();
    var dateSent:any = new Date(date);

    var seconds = Math.floor((today-dateSent) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " سنوات";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " أشهر";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " أيام";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " ساعات";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " دقائق";
    }
    return Math.floor(seconds) + " ثواني";
  }

}
