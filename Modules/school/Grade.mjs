import { Validator } from '../validator.mjs';
export class GradesbooksModel {

    constructor(groups, teachers, lms) {
        this.gradeBook = new Map()
        this.groups = groups;
        this.teachers = teachers;
        this.lms = lms;
    }

    async add(level, groupID) {
        if (!level || typeof level !=='number') {
            throw new Error('Level should be a Number!')
        }
        const id = Math.floor(Math.random() * 100);
        console.log(groupID);
        
        this.gradeBook.set( id, { level, groupID, records: [] });
        console.log(this.gradeBook);
        
        return id;
    }

    async clear() {
        return this.gradeBook.clear();
    }

    async addRecord(id, record) {
        // Validator.validate(record,schemaRecord)
        console.log(this.gradeBook.get(id));
        this.gradeBook.get(id).records.push( record );
    }

    async read(id, pupil) {
        const records = this.gradeBook.get(id).records.filter(record => record.pupilId === pupil);
        const { name: { first, last } } = await this.groups.students.read(records[0].pupilId);
        const result = { name: `${first} ${last}`, records: [] };

        for (const { teacherId, subjectId, lesson, mark } of records) {
            const { name: { first, last } } = await this.teachers.read(teacherId);
            console.log(await this.lms);
            const { title: subject } = await this.lms.read(subjectId);
            result.records.push({ teacher: `${first} ${last}`, subject, lesson, mark });
        }

        return result;
    }

    async readAll(id){
        const records = this.gradeBook.get(id).records;
        const result = new Map();

        for (const { pupilId, teacherId, subjectId, lesson, mark } of records) {
            
            if (!result.has(pupilId)) {
                const { name: { first, last } } = await this.groups.pupil.read(records[0].pupilId);
                result.set(pupilId, { name: `${first} ${last}`, records: [] });
            }

            const { name: { first, last } } = await this.teachers.read(teacherId);
            const { title: subject } = await this.lms.read(subjectId.id);
            result.get(pupilId).records.push({ teacher: `${first} ${last}`, subject, lesson, mark });        
        
        }

        return Array.from(result.values());
    }

}