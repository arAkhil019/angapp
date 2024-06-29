import { Injectable } from "@angular/core";
import exp from "constants";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database"; 
import { Employee } from "../models/common.model";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private dbpath = 'Employees';
    employeeRef: AngularFireList<any>;
    constructor(private db: AngularFireDatabase ) {
        this.employeeRef = db.list(this.dbpath);
    }

    // Create Employee/ Add Employee
    addEmployee(employee: Employee){
        // employee.ID = this.db.createPushId();
        return this.employeeRef.push(employee);
    }

    // Get all Employees
    getEmplyeesList(){
        return this.db.list(this.dbpath).snapshotChanges();
    }

    // Delete Employee
    deleteEmployee(key: string){
        return this.employeeRef.remove(key);
    }

    // Update Employee
    updateEmployee(key: string, value: any){
        return this.employeeRef.update(key, value);
    }
}
