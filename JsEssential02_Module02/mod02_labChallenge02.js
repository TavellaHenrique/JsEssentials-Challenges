/*
Exercício retirado do Curso JavaScript Essentials 2, da plataforma Cisco Networking Academy
*/

/*
Create a new class, ExtendedUser, that will inherit from the User class.

Put a setter and getter named fullName in it.
The getter should return the first name and last name concatenated into one string.
The setter takes the concatenated first and last name *e.g. 'Rafael Fifer') and splits it into first and last name (the split method),
changing the appropriate properties of the object.

Based on the ExtendedUser class, create two more classes, Teacher and Student (inheritance).
They should not have any new methods or properties, but only the default roles in their constructors to 'teacher' or 'student' respectively
(i.e. their constructors will take three parameters instead of four: name, surname, and email);

Test your solution using the following code:

let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
teacher1.addCourse('biology', 3);
teacher1.editCourse('chemistry', 4);
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 1 courses
student1.fullName = 'Rafael Fifer';
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses
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

let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
teacher1.addCourse('biology', 3);
teacher1.editCourse('chemistry', 4);
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 1 courses
student1.fullName = 'Rafael Fifer';
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses