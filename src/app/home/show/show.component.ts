import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { Employee } from '../../models/common.model';
import { ViewService } from '../../services/view.service';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [ TableModule, InputTextModule, InputIconModule, TagModule, CommonModule ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {
  employees!: Employee[];
  items!: any[];

  selectedEmployees!: Employee;

  constructor(private ViewService: ViewService) {}

  ngOnInit() {
  // this.ViewService.getEmployeesList()    toPromise().then((data: Employee[]) => (this.employees = data));
    this.ViewService.getEmployeesList().then((snapshot: QuerySnapshot<DocumentData>) => {
      this.items = snapshot.docs.map(doc => doc.data() as Employee);
      console.log(this.items);
    });
  }
}
