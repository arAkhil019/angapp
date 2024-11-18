import { Injectable } from "@angular/core";
import { Employee } from "../models/common.model";
import db from "./data.service";
import { collection, doc, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import storage from "./image.service";
import { uploadBytes, ref, deleteObject } from "firebase/storage";


@Injectable({
    providedIn: 'root'
})

export class EmployeeService { 

    constructor(){}

    // Create Employee/ Add Employee
    async addEmployee(employee: Employee){
        // employee.ID = this.db.createPushId();
        try{
            const docRef = await addDoc(collection(db, 'employees'), employee);
            await setDoc(docRef, { ...employee, ID: docRef.id });
            console.log('Document added with ID: ', employee.ID);
        }
        catch(e){
            console.error('Error adding document: ', e);
        }
    }


    // Delete Employee
    deleteEmployee(employee: Employee){
        try{
            this.deleteProof(employee.Proof as string);
            deleteDoc(doc(db, 'employees', employee.ID));
            return 'Employee removed successfully';
        }
        catch(e){
            console.error('Error deleting document: ', e);
            return 'Error removing employee';
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
    async uploadProof(file: any, name: String, time: string){
        try{
            const storageRef = ref(storage, 'proofs/')
            console.log(file);
            const imgRef = ref(storageRef, name + time +'.'+file.name.split('.').pop());
            await uploadBytes(imgRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!', snapshot);
            });
        }
        catch(e){
            console.error('Error uploading proof: ', e);
    }}

    //delete image
    async deleteProof(name: string){
        try{
            const storageRef = ref(storage, 'proofs/')
            const imgRef = ref(storageRef, name);
            deleteObject(imgRef).then(() => {
                console.log('Image deleted successfully');
            });}
        catch(e){
            console.error('Error deleting image: ', e);
        }
    }
}
