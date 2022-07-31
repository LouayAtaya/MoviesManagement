import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { ContentHeaderService, Movie, MoviesService } from 'src/app/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId;
  movie:Movie;

  loading$ = this.loadingService.loading$;

  constructor(private moviesService:MoviesService,private router:Router, private route:ActivatedRoute, private loadingService:LoadingService,private messageService: MessageService,private contentHeaderService:ContentHeaderService) { }

  ngOnInit(): void {
    this.loadingService.show();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.movieId=Number.parseInt(params.get("id"))

          return this.moviesService.getMovieDetails(this.movieId)
        }
        ))
        .subscribe(
          data => {
            this.loadingService.hide();
            
            this.movie = data;
            this.movie.image=environment.baseImagesUrl+this.movie.image;

            this.contentHeaderService.setMainHeaderTitle(this.movie.name)

          },
          error=>{
            this.loadingService.hide();
    
            this.messageService.add({severity:'error', summary: '  خطأ', detail: error, life:2000});
    
          }
        );
  }

 

 

}
