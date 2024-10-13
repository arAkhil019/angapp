import { Injectable } from '@angular/core';
import db from "./data.service";
import storage from "./image.service";
import { collection, query, where, getDoc, getDocs, doc } from "firebase/firestore";


@Injectable({
    providedIn : 'root'
})

export class ViewService{
    constructor(){
        this.getEmployeesList();
    }

    // Get all Employees
    async getEmployeesList(){
        const q = query(collection(db, 'employees'));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc);
        })
        return querySnapshot;
    }
}
