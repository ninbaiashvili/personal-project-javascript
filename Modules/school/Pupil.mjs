import { Validator } from '../validator.mjs';
export class PupilsModel{

    constructor(){
        this.map = new Map();
    }

    async add(object) {
        // validateObject(object);
        object.id = Math.floor(Math.random() * 10000);
        this.map.set(object.id, object);

        return object.id;
    }

    async update(object) {
        // validateObject(object);
        this.map.set(object.id, object);
    }

    async read(pupilId) {
        return this.map.get(pupilId);
    }

    async remove(pupilId) {
        if (this.verify(pupilId))
            this.map.delete(pupilId);
    }

    async verify(pupilId) {
        return this.map.has(pupilId);
    }

    // validateObject(object) {
    //     if (!Validator.validate(object, pupilsSchema)) {
    //         throw new Error("Validation Error");
    //     }
    // }
}

const pupilsSchema = {
    "name": {
      "first": "string",
      "last": "string"
    },
    "image": "string",
    "dateOfBirth": "string", // format date
    "phones": [
      {
        "phone": "string",
        "primary": "boolean"
      }
    ],
    "sex": "string", // male OR female
    "description": "string"
  }