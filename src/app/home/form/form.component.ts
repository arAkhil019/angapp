import { Component, OnInit, NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { CommonModule } from '@angular/common';
import { Role, Employee } from '../../models/common.model';
import { EmployeeService } from '../../services/employee.service';
import { HttpClient } from '@angular/common/http';


// import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
// import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, FloatLabelModule, FormsModule, InputNumberModule, InputGroupModule, InputGroupAddonModule, DropdownModule, ButtonModule, FileUploadModule, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [ MessageService ]
})


export class FormComponent implements OnInit {
  roles: Role[] | undefined;
  selectedRole: string = '';

  Aadhar: number = 0;
  Contact: string = '';
  ID: string = '';
  Name: string = '';
  Pan: string = '';
  fileProof: File = new File([], '');
  Salaray: number = 0;
  Type: string = '';
  imageSrc: string = '';

  employee: Employee[] = [];
  empObj: Employee = {
    Aadhar: 0,
    Contact: '',
    ID: '',
    Name: '',
    Pan: '',
    Proof: '',
    Salaray: 0,
    Type: '',
    Time: ''
  };


  constructor( private db: EmployeeService, private http: HttpClient, private messageService: MessageService) { }

    async onUpload($event: FileUploadHandlerEvent) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
        if($event.files.length != 0) {
        const file = $event.files[0];
        this.fileProof = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // Set image src
            this.imageSrc = e.target.result;
        }
        reader.readAsDataURL($event.files[0]);
        console.log($event);
    }}


  ngOnInit() {
    this.roles = [
      'Full Time','Contractor','Intern'
      ];
    };
  
  resetForm(){
    this.Aadhar = 0;
    this.Contact = '';
    this.ID = '';
    this.Name = '';
    this.Pan = '';
    this.fileProof = new File([], '');
    this.Salaray = 0;
    this.Type = '';
    this.imageSrc = '';
  }
  addEmployee(){
    this.empObj.Name = this.Name;
    this.empObj.Salaray = this.Salaray;
    this.empObj.Type = this.Type;
    this.empObj.ID = this.ID;
    this.empObj.Contact = this.Contact;
    this.empObj.Aadhar = this.Aadhar;
    this.empObj.Pan = this.Pan;
    this.empObj.Proof = '';
    this.empObj.Time = new Date().toISOString();

    // Corrected conditional check
    if (this.Aadhar, this.Contact, this.ID, this.Name, this.Pan, this.fileProof, this.Salaray, this.Type , this.imageSrc) {
      const fileName = this.Name + this.empObj.ID;
      this.empObj.Proof = fileName + '.' + this.fileProof.name.split('.').pop();
      console.log('Adding employee:', this.empObj); // Logging the employee object
      this.db.addEmployee(this.empObj)
      console.log('Employee added:', this.empObj); // Logging the response from the database
      this.db.uploadProof(this.fileProof, fileName, this.empObj.Time);
      alert(this.selectedRole + ' ' + this.empObj.Name + ' ' + this.empObj.Salaray + ' ' + this.empObj.ID + ' ' + this.empObj.Contact + ' ' + this.empObj.Aadhar);
      this.resetForm();
    } else {
        alert('Please fill all the fields/Proof not uploaded');
    }
  }
}