import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ContentHeaderService, Movie, MoviesService } from 'src/app/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MovieForCreation } from '../../../core/models/movie-for-creation';
import { Category } from '../../../core/models/category';
import { CategoriesService } from '../../../core/services/categories.service';
import { NotEmpty } from 'src/app/shared/validators';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  movieForm: FormGroup;

  movieForCreation:MovieForCreation;

  movieCategoriesList:Category[];

  loading$ = this.loadingService.loading$;

  constructor( private formBuilder: FormBuilder,private moviesService:MoviesService,private categoriesService:CategoriesService,private router:Router, private route:ActivatedRoute, private loadingService:LoadingService,private messageService: MessageService,private contentHeaderService:ContentHeaderService) { }

  ngOnInit(): void {
    this.contentHeaderService.setMainHeaderTitle("إضافة فيلم")

    this.getMovieCategoriesList();

    this.movieForm= this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50), NotEmpty]],
      description:['',[Validators.maxLength(500)]],
      category_id:[null,[Validators.required]],
      fileInput:['',[Validators.required]],
      image:[]
    })
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

  onSubmit(){
    this.loadingService.show();

    this.movieForCreation=new MovieForCreation(this.movieForm.value);

    this.moviesService.addMovie(this.movieForCreation)
      .subscribe(
        data=>{
          this.loadingService.hide();

          this.messageService.add({severity:'success', summary: ' فيلم جديد', detail: 'تم إضافة الفيلم  بنجاح', life:2000});

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
