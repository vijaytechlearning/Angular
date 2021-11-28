import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  pageTitle = "Student List";
  students: Student[] = [];
  displayedColumns: string[] = ['imagePath', 'rollNumber', 'name', 'action'];
  dataSource: Student[] = [];
  subGet: Subscription;
  subDialog: Subscription;
  constructor(private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subGet = this.studentService.getSudents().subscribe(data => this.dataSource = data.students)
  }

  editStudent(student: Student): void{
    this.router.navigate(['student','edit',student.rollNumber])
  }

  deleteStudent(student: Student): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Delete Student",
        content: "Are you sure to delete <strong>"+student.name+"</strong> student",
        type: "delete"
      }
    });
    this.subDialog = dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.studentService.deleteSudent(student.id).subscribe(data=>{
          this.dataSource = data.students;
        });
      }
    });
  }

  ngOnDestroy(): void{
    this.subGet?.unsubscribe();
    this.subDialog?.unsubscribe();
  }

}
