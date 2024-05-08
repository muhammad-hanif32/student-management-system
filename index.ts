#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Define the student class
class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 10000
    }
    //  Method to enroll a student in a course

    enroll_course(course: string){
        this.courses.push(course);
    }
    // Method to view a student balance
    view_balance(){
        console.log(`balance for ${this.name} : PKR ${this.balance}`);
    }
    
    // Method to pay student fees
    
    pay_fees(amount: number){
            this.balance -= amount;
            console.log(`PKR ${amount}Fess paid Successfully for ${this.name}`);
            console.log(`Remaining Balance : PKR${this.balance}`);
    }
    // Method to display student status
    show_status(){
            console.log(`ID: ${this.id}`);
            console.log(`Name: ${this.name}`);
            console.log(`Course: ${this.courses}`);
            console.log(`Balance: ${this.balance}`);
    }
}

class Student_manager{
    students: Student[]

    constructor(){
        this.students = [];
    }

    // Method to add a new student

    add_student(name: string){
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    // Method to enroll a student in a course
    enroll_student(student_id: number, course: string){
        let student = this.find_student(student_id);
        if(student){
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }

    // Method to view a student balance
    view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if(student){
            student.view_balance();
        }
        else{
            console.log("Student not found. Please entar a correct Student ID ");
        }
    }

    // Method to pay student fees
    pay_student_fees(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if(student){
            student.pay_fees(amount);
        }
        else{
            console.log("Student not found. Please entar a correct Student ID ");
        }
    }
    // Method to display student-status

    show_student_status(student_id: number){
        let student = this.find_student(student_id);
        if(student){
            student.show_status();
        }
    }

    // Method to find a student by student-id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id);
    }
}

async function main(){
    console.log(chalk.bold.rgb(204, 204, 204)(`\n \t\t <<<=======================================>>>`));
    console.log(chalk.bold.rgb(204, 204, 204)(`<<<===========>>> ${chalk.bold.blue(`WELLCOM TO \'CODING TECH SOLUTIONS\'`)}<<<<=========>>>`));
    console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<=======================================>>>\n`))

    let student_menager = new Student_manager();

    while (true){
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        switch(choice.choice){
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_menager.add_student(name_input.name);
                break;

            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                student_menager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_menager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Pay",
                    }
                ]);
                student_menager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_menager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting....");
                process.exit();
        }
    }
}
main();