import { Validator } from '../validator.mjs';
export class TeachersModel{

    constructor(){
        this.map = new Map();
        this.tid = "";
    }

    async add(object) {
        // validateObject(object);
        object.id = Math.floor(Math.random() * 1000);
        this.map.set(object.id, object);

        return object.id;
    }

    async update(object) {
        // validateObject(object);
        this.map.set(object.id, object);
    }

    async read(teacherId) {
        return this.map.get(teacherId);
    }

    async remove(id) {
        if(this.verify(teacherId))
        this.map.delete(teacherId);
    }

    async verify(teacherId) {
        return this.map.has(teacherId);
    }

    // async validateObject(object) {
    //     if(!Validator.validate(object,teacherSchema)){
    //         throw new Error("Validation Error");
    //     }
    // }
}

const teacherSchema = {
    "name": {
        "first": "string",
        "last": "string"
    },
    "image": "string",
    "dateOfBirth": "string", // format date
    "emails": [
        {
        "email": "string",
        "primary": "boolean"
        }
    ],
    "phones": [
        {
        "phone": "string",
        "primary": "boolean"
        }
    ],
    "sex": "string", // male or female
    "subjects": [
        {
        "subject": "string"
        }
    ],
    "description": "string",
  };