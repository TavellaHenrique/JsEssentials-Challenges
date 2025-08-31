/*
Exercício retirado do Curso JavaScript Essentials 2, da plataforma Cisco Networking Academy
*/

/*
Create an ExtendedTutoring class, inheriting from Tutoring.

Equip it with one new method: sendMessages(from, to, message).
The from argument is the user (student or teacher) who sends the message.
The argument to is the list of recipients (user objects).

Test your solution using the following code:

let tutoring = new ExtendedTutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let to = [];
to.push(tutoring.getStudentByName('Rafael', 'Fife'));
to.push(tutoring.getStudentByName('Kelly', 'Estes'));
tutoring.sendMessages(tutoring.getTeacherByName('Paula', 'Thompkins'), to, 'test message');
for(let user of to) {
    user.showMessagesHistory();
}
// -> PaulaThompkins@jourrapide.com -> rfife@rhyta.com: test message
// -> PaulaThompkins@jourrapide.com -> k_estes@dayrep.com: test message
*/
function sendEmail(from, to, message) {}

class User {
    constructor ({name, surname, email, role}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;

        this.courses = [];
        this.messages = []; // {from, to, content}
    }

    sendMessage(from, message) {
        this.messages.push({from: from.email, to: this.email, content: message});
        sendEmail(from.email, this.email, message);
    }

    showMessagesHistory() {
        for (let message of this.messages) {
            console.log(`${message.from} -> ${message.to}: ${message.content}`);
        }
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
        for (let student of this.students) {
            if (ExtendedUser.match(teacher, student).length) {
                matches.push(student);
            }
        }
        return matches;
    }

    getTeacherForStudent(student) {
        let matches = [];
        for (let teacher of this.teachers) {
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

class ExtendedTutoring extends Tutoring {
    constructor() {
        super();
    }

    sendMessages(from, to = [], message) {
        // Verifica se há um remetente e pelo menos um destinatário
        if (from && to.length) {
            // Envia uma mensagem para cada contato na lista
            to.forEach(contact => {contact.sendMessage(from, message)});
        }
    }
}

let tutoring = new ExtendedTutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let to = [];
to.push(tutoring.getStudentByName('Rafael', 'Fife'));
to.push(tutoring.getStudentByName('Kelly', 'Estes'));
tutoring.sendMessages(tutoring.getTeacherByName('Paula', 'Thompkins'), to, 'test message');
for(let user of to) {
    user.showMessagesHistory();
}
// -> PaulaThompkins@jourrapide.com -> rfife@rhyta.com: test message
// -> PaulaThompkins@jourrapide.com -> k_estes@dayrep.com: test message