#! user/bin/env node

import inquirer from "inquirer"

class student {
    id: string;
    name: string;
    coursesEnrolled: string[];
    feesAmount: number;

    constructor(id: string, name: string, coursesEnrolled: string[], feesAmount: number) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}

let baseId = 10000
let studentId:string = "";
let continueEnrollment = true;

let students: student[] = []

do{
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:\n",
        choices: ["Enroll a new student", "Display student status"]
    })
   
    if(action.ans === "Enroll a new student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Enter your name:"
        })

        let trimmedStudentName = studentName.ans.trim().toLowerCase()
        let studentNameCheck = students.map(obj => obj.name)

       if(studentNameCheck.includes(trimmedStudentName) === false) {
        if(trimmedStudentName !== "") {
            baseId++
            studentId = "STID" + baseId

            console.log("\n\tYour account has been created");
            console.log(`Welcome, ${trimmedStudentName}!`)

            let course = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select a course",
                choices: ["AI", "Web3", "Metaverse"]
            })

            let courseFees = 0;
            switch(course.ans) {
                case "AI":
                    courseFees = 5000
                    break;

                case "Web3":
                    courseFees = 3000
                    break;
                    
                case "Metaverse":
                    courseFees = 4000
                    break;    
            }

            let courseConfirm = await inquirer.prompt({
                type: "confirm",
                name: "ans",
                message: "Do you want to enroll in this course"
            })

            if(courseConfirm.ans === true) {
                let Student = new student(studentId, trimmedStudentName, [course.ans], courseFees)
                students.push(Student)

                console.log("You have enrolled in this course");
            }

        }else{
            console.log("invalid name");
        }

       }else{
        console.log("Name already exists");

       }

    }
    else if(action.ans === "Display student status") {
        if(students.length !== 0) {
            let studentNameCheck = students.map(e => e.name)

            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "select a name",
                choices: studentNameCheck
            })

            let foundStudent = students.find(student => student.name === selectedStudent.ans)

            console.log("Student Information");
            console.log(foundStudent);
            console.log("\n");
            
            
        }else {
            console.log("Record is emty");   
        }

    }

            let userConfirm = await inquirer.prompt({
                type: "confirm",
                name: "ans",
                message: "Do you want to continue?"
            })

            if(userConfirm.ans === false) {
                 continueEnrollment = false
            }
            
}while(continueEnrollment) 