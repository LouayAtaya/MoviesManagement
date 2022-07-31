import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, ContentHeaderService, MoviesService } from 'src/app/core';
import { MovieForUpdate } from '../../../core/models/movie-for-update';
import { Movie } from '../../../core/models/movie';
import { NotEmpty } from 'src/app/shared/validators';
import { switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {
  movieId:number;

  movie:Movie;

  movieForm: FormGroup;

  movieForUpdate:MovieForUpdate;

  movieCategoriesList:Category[];

  loading$ = this.loadingService.loading$;

  constructor( private formBuilder: FormBuilder,private moviesService:MoviesService,private categoriesService:CategoriesService,private router:Router, private route:ActivatedRoute, private loadingService:LoadingService,private messageService: MessageService,private contentHeaderService:ContentHeaderService) { }

  ngOnInit(): void {
    this.loadingService.show();

    this.getMovieCategoriesList();

    this.movieForm= this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50), NotEmpty]],
      description:['',[Validators.maxLength(500)]],
      category_id:[null,[Validators.required]],
      fileInput:[''],
      image:[]
    })

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
          this.contentHeaderService.setMainHeaderTitle(this.movie.name)

          this.initializeFormWithMovie();
        },
        error=>{
          this.loadingService.hide();
  
          this.messageService.add({severity:'error', summary: '  خطأ', detail: error, life:2000});
  
        }
      );
    
  }

  get name(){
    return this.movieForm.get('name');
  }

  get description(){
    return this.movieForm.get('description');
  }

  get category_id(){
    return this.movieForm.get('category_id');
  }

  get fileInput(){
    return this.movieForm.get('fileInput');
  }

  uploadedImage:File
  onFileChange(event){
    console.log(event)
    if(event.target.files.length>0){
      console.log("event")
      const file=event.target.files[0];
      this.uploadedImage=file;

      this.movieForm.patchValue({
        image:this.uploadedImage
      });
      
    }
     
  }

  initializeFormWithMovie(){
    this.movieForm.patchValue({
      name:this.movie.name,
      description:this.movie.description?this.movie.description:'',
      category_id:this.movie.category_id
    })
  }

  onSubmit(){
    this.loadingService.show();

    this.movieForUpdate=new MovieForUpdate(this.movieForm.value);

    this.moviesService.UpdateMovie(this.movieId,this.movieForUpdate)
      .subscribe(
        data=>{
          this.loadingService.hide();

          this.messageService.add({severity:'success', summary: ' تعديل الفيلم ', detail: 'تم تعديل معلومات الفيلم  بنجاح', life:2000});

          setTimeout(() => {
            this.router.navigate(['/movies']);

          }, 2000);
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

}
