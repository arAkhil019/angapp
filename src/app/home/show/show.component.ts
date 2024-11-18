import { Component, OnInit, OnDestroy, ViewChild, viewChild, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';
import { InputIconModule } from 'primeng/inputicon';
import { Employee } from '../../models/common.model';
import { ViewService } from '../../services/view.service';
import { ConfirmationService,MessageService } from 'primeng/api';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { EmployeeService } from '../../services/employee.service';
import { SkeletonModule } from 'primeng/skeleton';
import { collection, query, orderBy, startAfter, limit, getDocs } from 'firebase/firestore';


import { TableModule, Table } from 'primeng/table';
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
    SkeletonModule,
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
export class ShowComponent{
    @ViewChild('dt') table!: TableModule;

    employeeDialog: boolean = false;
    employees: Employee[] = [];
    employee!: Employee;
    selectedEmployees: Employee[] | null = null;
    submitted: boolean = false;
    loading: boolean = true;
    error: string | null = null;
    virtualScroll: boolean = true;
    loadingMore: boolean = false;
    noMoreData: boolean = false;

    getSeverity(type: string) {
        switch (type) {
            case 'Full Time':
                return 'success';
            case 'Intern':
                return 'info';
            case 'Contractor':
                return 'warning';
            default:
                return null;
        }
    }
    
    private subscriptions: Subscription[] = [];
    private scrollThreshold = 90;

    constructor(
        private EmployeeSerive: EmployeeService, 
        private viewService: ViewService, 
        private confirmationService: ConfirmationService, 
        private messageService: MessageService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loadInitialData();
        // this.viewService.getEmployeesData<Employee>('employees')
        //   .subscribe({
        // next: (data: Employee[]) => {
        //   this.employees = data;
        //   this.loading = false;
        // },
        // error: (error: any) => {
        //   console.error('Error fetching employees:', error);
        //   this.error = error;
        //   this.loading = false;
        //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching employees', life: 3000 });
        // }
        //   });
    }

    private loadInitialData() {
        this.loading = true;
        const subscription = this.viewService
            .getEmployeesData<Employee>('employees', 'Name', 'asc')
            .pipe(finalize(() => {
                this.loading = false;
                this.changeDetectorRef.detectChanges();
            }))
            .subscribe({
                next: (data: Employee[]) => {
                    this.employees = data;
                    this.error = null;
                },
                error: (error: any) => {
                    console.error('Error fetching employees:', error);
                    this.error = 'Failed to load employees. Please try again.';
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: this.error,
                        life: 3000
                    });
                }
            });

        this.subscriptions.push(subscription);
    }

    onScroll(event: any) {
        if (this.loadingMore || this.noMoreData) return;

        const element = event.target;
        const scrollPosition = element.scrollTop + element.clientHeight;
        const scrollHeight = element.scrollHeight;
        const scrollPercentage = (scrollPosition / scrollHeight) * 100;

        if (scrollPercentage > this.scrollThreshold) {
            this.loadMoreData();
        }
    }

    loadMoreData() {
        if (this.loadingMore) return;

        this.loadingMore = true;
        const subscription = this.viewService.loadMoreEmployees()
            .pipe(finalize(() => {
                this.loadingMore = false;
                this.changeDetectorRef.detectChanges();
            }))
            .subscribe({
                next: (newEmployees: Employee[]) => {
                    if (newEmployees.length === 0) {
                        this.noMoreData = true;
                        return;
                    }
                    this.employees = [...this.employees, ...newEmployees];
                },
                error: (error: any) => {
                    if (error.message === 'No more data available') {
                        this.noMoreData = true;
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to load more employees',
                            life: 3000
                        });
                    }
                }
            });

        this.subscriptions.push(subscription);
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
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
                this.EmployeeSerive.deleteEmployee(employee);
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
