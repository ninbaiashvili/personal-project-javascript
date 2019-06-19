import {
  LMSModel,
  SubjectsModel,
  TeachersModel,
  PupilsModel,
  GroupsModel,
  GradesbooksModel
} from './Modules/index';

// LMS

var obj = {
  "title": "string",
  "lessons": "number",
  "description": "string"
}
  
const history = new SubjectsModel({
  title: 'History',
  lessons: 24,
  description: "Desc"
});
  
// will return subjectId
// console.log(history.id);
  
const lms = new LMSModel();

(async () => {
  await lms.add(history);
  
  await lms.update(history);

  // await lms.remove(history);

  await lms.verify(history);

  await lms.readAll();
  
})()

// Teachers

let data =  {
  "name": {
    "first": "Nin",
    "last": "Bai"
  },
  "image": "Img",
  "dateOfBirth": "07.07.1994", // format date
  "emails": [
    {
      "email": "nin.baiashvili@gmail.com",
      "primary": true
    }
  ],
  "phones": [
    {
      "phone": "593593593",
      "primary": true
    }
  ],
  "sex": "female",
  "subjects": [
    {
      "subject": "History"
    }
  ],
  "description": "This is description.",
};

const teachers = new TeachersModel();
let teacherId = "";

(async () => {

  teacherId = await teachers.add(data);

  // will return Teachers data including teacher's id
  const readteacher = await teachers.read(teacherId);

  // will update Teacher. This method should use the same validation as a constructor method
  const teacherId1 = teachers.update(teacherId, data)

  // will remove Teacher
  await teachers.remove(teacherId)

})()

// Pupils

let pulitdata = {
  "name": {
    "first": "Nin",
    "last": "Bai"
  },
  "image": "Img",
  "dateOfBirth": "07.07.1994", // format date
  "phones": [
    {
      "phone": "593593593",
      "primary": true
    }
  ],
  "sex": "female", // male OR female
  "description": "This is description."
};

// Create new Pupil from Pupil's data
const pupils = new PupilsModel();
let pupilId = "";

// Groups

const room = 236;
const groups = new GroupsModel(pupils);
let groupId = "";

(async () => {

  // Create a new pupil
  pupilId = await pupils.add(pulitdata);
  // will return Pupils data including pupil's id
  const showpupils = await pupils.read(pupilId)

  // will update Pupil. This method should use the same validation as a constructor method
  await pupils.update(pupilId, pulitdata)

  // will remove pupil
  await pupils.remove(pupilId)

  //Groups -----------

  // Create a new group
  groupId = await groups.add(room);
  console.log(groupId);

  // Add this pupil to this group
  // await groups.addPupil(groupId, pupilId);

  // Remove this pupil from this group
  // await groups.removePupil(groupId, pupilId);

  // Update room for this group
  await groups.update(groupId, {
    room: 237
  });

  // Read information about group
  // console.log(await groups.read(groupId));

  // It will return array of groups
  console.log(await groups.readAll());

})()


// Gradebooks

const gradebooks = new GradesbooksModel(groups, teachers, lms);
const pupilId1 = pupils.pid;
const teacherId1 = teachers.tid;
const level = 1;

(async () => {

  // Create a new gradebook
  const gradebookId = await gradebooks.add(level, groupId);

  // Destroy all data inside this gradebook
  gradebooks.clear();

  const record = {
    "pupilId": pupilId1,
    "teacherId": teacherId1,
    "subjectId": history.id,
    "lesson": 1,
    "mark": 9
  };

  console.log(gradebooks.addRecord(gradebookId, record));

  // Read information about oliver results
  const oliver = await gradebooks.read(gradebookId, pupilId);
  
  // Read information about all students in this gradebook
  const students = await gradebooks.readAll(gradebookId);
})()