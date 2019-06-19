import {  PupilsModel } from '../../Modules/index';
export class GroupsModel{

    constructor(groupId){
        this.pupils = [];
        this.groupId = groupId;
        this.level = undefined;
        this.map = new Map();
        this.students = groupId;
    }

    async add(room) {
        const id = Math.floor(Math.random() * 100);
        this.map.set(id, {id, room, students: []});
        
        return id;
    }

    async addPupil(groupId, pupilObject) {
        var pupils = this.map.get(groupId);
        pupils.students.push(pupilObject);
        // console.log(pupils);
        
        // this.map
    }

    async update(groupId, room) {
        // console.log({...this.map.get(groupId), ...room});
        this.map.set(groupId, {...this.map.get(groupId), ...room});
        this.map.get(groupId);

    }

    async verify(groupId) {
        return this.map.has(groupId);
    }

    async readAll() {
        return Array.from(this.map.values());
    }
}