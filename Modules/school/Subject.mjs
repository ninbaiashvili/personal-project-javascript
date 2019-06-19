import { Validator } from '../validator.mjs';
export class SubjectsModel{
    constructor(obj){
        // if(Validator.validateObject(obj,schema)){
            this.title = obj.title;
            this.lessons = obj.lessons;
            this.description = obj.description;
            this.id = Math.floor(Math.random() * 100);
        // }else {
            // throw new Error("Validation Error");
        // }
    }
}  

const schema = {
    "title": "string",
    "lessons": "number",
    "description": "string"
}