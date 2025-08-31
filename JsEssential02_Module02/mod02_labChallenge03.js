/*
Exercício retirado do Curso JavaScript Essentials 2, da plataforma Cisco Networking Academy
*/

/*
Modify the ExtendedUser class (rewrite it) by adding a static match method to it.
The method should retrieve the teacher object, student object, and optionally a course name.
Its task is to find the match between the student and the teacher.

In case the course name is not provided, the method should return:

an empty array if there is no match (the teacher does not teach courses the student is interested in, or teaches courses at a lower level)
an array with {course, level} objects, if the teacher teaches the courses the student is interested in.
If the course name is passed as the last argument, then the method should return the {course, level} object in case of a correct match,
or undefined otherwise.

Test your solution using the following code:

let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 4);
teacher1.addCourse('maths', 4);
let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]
teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []
teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}
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

let student1 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 4);
teacher1.addCourse('maths', 4);
let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]
teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []
teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}