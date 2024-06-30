import { Injectable } from "@angular/core";
import exp from "constants";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database"; 
import { Employee } from "../models/common.model";
import db from "./data.service";
import { collection, addDoc } from "firebase/firestore";


@Injectable({
    providedIn: 'root'
})

export class EmployeeService {


    // Create Employee/ Add Employee
    addEmployee(employee: Employee){
        // employee.ID = this.db.createPushId();
        try{
            addDoc(collection(db, 'employees'), employee);
            console.log('Document added with ID: ', employee.ID);
        }
        catch(e){
            console.error('Error adding document: ', e);
        }
    }

    // Get all Employees
    getEmplyeesList(){
        try{
            return collection(db, 'employees');
        }
        catch(e){
            console.error('Error getting documents: ', e);
            return 'Error getting documents';
        }
    }

    // Delete Employee
    deleteEmployee(key: string){
        try{
            return '';
        }
        catch(e){
            console.error('Error deleting document: ', e);
            return 'Error deleting document';
        }
    }

    // Update Employee
    updateEmployee(key: string, value: any){
        try{
            return ''
        }
        catch(e){
            console.error('Error updating document: ', e);
            return 'Error updating document';
        }
    }
}
