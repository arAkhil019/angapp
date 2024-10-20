import { Injectable } from "@angular/core";
import { Employee } from "../models/common.model";
import db from "./data.service";
import { collection, addDoc, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import storage from "./image.service";
import { uploadBytes, ref } from "firebase/storage";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {

    constructor(){}

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

    // Uplaod Proof
    async uploadProof(file: any, name: String){
        try{
            const storageRef = ref(storage, 'proofs/')
            console.log(file);
            const imgRef = ref(storageRef, name+'.'+file.name.split('.').pop());
            await uploadBytes(imgRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!', snapshot);
            });
        }
        catch(e){
            console.error('Error uploading proof: ', e);
    }
}
}
