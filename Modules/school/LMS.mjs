export class LMSModel {

  constructor() {
    this.map = new Map();
  }

  async add(object) {
    // if (!this.verify(object.id))
    // console.log(object);
      this.map.set(object.id, object);
  }

  async remove(objectId) {
    if (this.verify(objectId.id))
      this.map.delete(objectId.id);
  }

  async update(newObject) {
    // console.log(newObject);
    this.map.set(newObject.id, newObject);
  }

  async verify(objectId) {
    // console.log(this.map.has(objectId.id));
    return this.map.has(objectId.id);
  }

  async read(objectId) {
    // console.log(this.map.get(objectId));
    return this.map.get(objectId);
  }

  async readAll() {
    let response = [];
    this.map.forEach((value, key, ownMap) => {
      // console.log('key');
      response.push({subjectid: key});
    });
    return response;
  }
}