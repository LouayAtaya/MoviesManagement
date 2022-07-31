import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  formDataCreator(model): FormData{

    var formData= new FormData();
    console.log(model)
    for (let key of Object.keys(model)) {
      let value = model[key];


      if(value instanceof Array  && value !=null && value.length!=0){
       
       console.log(value)

        for(let i=0;i<value.length;i++){
          
          //check if value[i] is file
          if(value[i] instanceof File){
            formData.append(key,value[i])
          }else{
            for (const subKey of Object.keys(value[i])) {
            
              let subvalue = value[i][subKey];
              let key1=key+"["+i+"]["+subKey+"]"
             
              formData.append(key1, subvalue);
            }

          }
          
        }
        
      }
      else{
        formData.append(key, value);
      }
    }

    return formData;
  }
}
