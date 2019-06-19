export class Validator { 
    static validateObject(object, schema) {
        for (let prop in schema) {
            if (schema.hasOwnProperty(prop)) {
                var type = schema[prop];
                if (!object.hasOwnProperty(prop)) {
                    return false;
                }
                if (Array.isArray(type)) {
                    return this.validateObject(object[prop], schema[prop]);
                } else if (typeof type === 'object') {
                    return this.validateObject(object[prop], schema[prop]);
                } else if (typeof type === 'string' || typeof type === 'boolean') {
                    if (typeof object[prop] !== type) {
                        return false;
                    }
                }
            }
        }
    }

    static validateSex(object) {
        return object.sex == 'male' || object.sex == 'female';
    }

    static validateDate(object) {
        return Date.parse(object.dateOfBirth);
    }
}