/*
Exercício retirado do Curso JavaScript Essentials 2, da plataforma Cisco Networking Academy
*/

/*
Let's try to put all the previously prepared elements together.
Create a Tutoring class that will have two lists of users: students and teachers separately.

Define methods in it:

getStudentByName(name, surname) - which will return a student object with the given name and surname 
(or undefined if the student has not been added before)
getTeacherByName(name, surname) - which will return the teacher object with the given name and surname
(or undefined if the teacher has not been added before)
getStudentsForTeacher(teacher) - which will return an array of students that teacher is able to tutor;
getTeacherForStudent(student) - which will return an array of teachers able to tutor the student;
addStudent(name, surname, email) - which will add a new student object to the list;
addTeacher(name, surname, email) - which will add a new teacher object to the list.
Use previously prepared classes and their methods (e.g. match).

Test your solution using the following code:

let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);
let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);
let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> undefined
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...
*/

class User {
    constructor ({name, surname, email, role}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;

        this.courses = [];
    }

    /**
     * Returns the course index, or -1 if it doesn't exists.
     * 
     * @param {string} course Course name
     * @returns {number} Course index or -1
     */
    #getCourseIndex(course) {
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].course === course) {
                return i;
            }
        }
        return -1;
    }

    addCourse(course, level) {
        if (this.#getCourseIndex(course) < 0) {
            this.courses.push({course, level});
        }
    }

    removeCourse(course) {
        let i = this.#getCourseIndex(course);
        if (i >= 0) {
            this.courses.splice(i, 1);
        }
    }

    editCourse(course, level) {
        let i = this.#getCourseIndex(course);
        if (i >= 0) {
            this.courses[i].level = level;
        }
    }
}

class ExtendedUser extends User {
    constructor ({name, surname, email, role}) {
        super({name, surname, email, role});
    }

    static match(teacher, student, course) {
        if (!(teacher instanceof Teacher) || !(student instanceof Student)) {
            throw new TypeError("Invalid argument types, they should be Teacher and Student, respectively");
        }

        let all_matches = [];

        for (let teacher_course of teacher.courses) {
            for (let student_course of student.courses) {
                if (teacher_course["course"] === student_course["course"]) {
                    if (teacher_course["level"] >= student_course["level"]) {
                        all_matches.push(student_course);
                    }
                }
            }
        }

        if (course) {
            for (let matched of all_matches) {
                if (matched["course"] === course) {
                    return matched;
                }
            }
            return undefined;
        } else {
            return all_matches;
        }
    }

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
    set fullName(fullName) {
        let splittedNames = fullName.split(" ");
        if (splittedNames[0] && splittedNames[1]) {
            this.name = splittedNames[0];
            this.surname = splittedNames[1];
        }
    }
}

class Teacher extends ExtendedUser {
    constructor ({name, surname, email}) {
        super({name, surname, email, role: "teacher"});
    }
}

class Student extends ExtendedUser {
    constructor ({name, surname, email}) {
        super({name, surname, email, role: "student"});
    }
}

class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    getStudentByName(name, surname) {
        for (let student of this.students) {
            if (student.name === name && student.surname === surname) {
                return student;
            }
        }
        return undefined;
    }

    getTeacherByName(name, surname) {
        for (let teacher of this.teachers) {
            if (teacher.name === name && teacher.surname === surname) {
                return teacher;
            }
        }
        return undefined;
    }

    getStudentsForTeacher(teacher) {
        let matches = [];
        for (student of this.students) {
            if (ExtendedUser.match(teacher, student).length) {
                matches.push(student);
            }
        }
        return matches;
    }

    getTeacherForStudent(student) {
        let matches = [];
        for (teacher of this.teachers) {
            if (ExtendedUser.match(teacher, student).length) {
                matches.push(teacher);
            }
        }
        return matches;
    }

    addStudent(name, surname, email) {
        this.students.push(new Student({name, surname, email}));

    }

    addTeacher(name, surname, email) {
        this.teachers.push(new Teacher({name, surname, email}));
    }
}

let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);
let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);
let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> undefined
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...