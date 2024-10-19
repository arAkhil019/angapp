import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InputIconModule } from 'primeng/inputicon';
import { Employee } from '../../models/common.model';
import { ViewService } from '../../services/view.service';
import { ConfirmationService,MessageService } from 'primeng/api';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';


import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-show',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    TableModule,
    InputTextModule,
    InputIconModule,
    TagModule,
    CommonModule,
    DropdownModule,
    RadioButtonModule,
    FormsModule,
    InputNumberModule,
    DialogModule,
    Ripple,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextareaModule,
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
  styles: [
    `:host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 10px auto 2rem auto;
        display: block;
        gap: 1rem;
    }`]
})
export class ShowComponent implements OnInit {
    employeeDialog: boolean = false;

    employees!: Employee[];

    employee!: Employee;

    selectedEmployees!: Employee[] | null;

    submitted: boolean = false;

    statuses!: any[];
    items!: any[];


    constructor(private ViewService: ViewService, 
        private confirmationService: ConfirmationService, 
        private messageService: MessageService
    ) {}

    ngOnInit() {
    // getting the employees list on component initialization
    this.ViewService.getEmployeesList().then(
        (snapshot: QuerySnapshot<DocumentData>) => {
          this.items = snapshot.docs.map((doc) => doc.data() as Employee);
          console.log(this.items);
          this.employees = this.items;
      });
    }

    openNew() {
        // write code to divert page to form component
        this.submitted = false;
        this.employeeDialog = true;
    }

    deleteSelectedEmployees() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.employees = this.employees.filter((val) => !this.selectedEmployees?.includes(val));
                this.selectedEmployees = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
            }
        });
    }

    editEmployee(employee: Employee) {
        this.employee = { ...employee };
        this.employeeDialog = true;
    }

    deleteEmployee(employee: Employee) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + employee.Name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.employees = this.employees.filter((val) => val.ID !== employee.ID);
                //write code to reset the form
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employe Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.employeeDialog = false;
        this.submitted = false;
    }

    saveEmployee() {
        this.submitted = true;

        if (this.employee.Name?.trim()) {
            if (this.employee.ID) {
                this.employees[this.findIndexById(this.employee.ID)] = this.employee;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
            } else {
                this.employee.ID = this.createId();
                this.employee.Proof = 'product-placeholder.svg'; // default image
                this.employees.push(this.employee);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
            }

            this.employees = [...this.employees];
            this.employeeDialog = false;
            //write code to reset the form
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].ID === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
