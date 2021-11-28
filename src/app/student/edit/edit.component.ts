import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { TitleService } from 'src/app/services/title.service';
import { Student } from '../student';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  pageTitle = "";
  editMode = true;
  imagePreview: string;
  student: Student = {id:'',name:'', rollNumber:0, imagePath: ''};
  editStudent: FormGroup;
  subParam: Subscription;
  subUrl: Subscription;
  subSave: Subscription;
  subGet: Subscription;
  constructor(private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subUrl = this.route.url.subscribe(path=> {
      if(path[0].path === "add"){
        this.editMode = false;
        this.pageTitle = "Add New Student";
      }else{
        this.editMode = true;
        this.pageTitle = "Edit Student";
      }
    })
    this.editStudent = this.fb.group({
      rollNumber: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      name: ['', Validators.required],
      image: ['', Validators.required]
    })
    if(this.editMode){
      this.subParam = this.route.paramMap.subscribe(params=>{
        let rollno = +params.get("rollNumber");
        if(rollno){
          this.subGet = this.studentService.getSudent(rollno).subscribe((student: any)=>{
            this.student = student.student;
            this.updateStudentForm();
          })
        }
      })
    }
  }
  ngOnDestroy(): void{
    this.subParam?.unsubscribe();
    this.subSave?.unsubscribe();
    this.subGet?.unsubscribe();
    this.subUrl?.unsubscribe();
  }
  private updateStudentForm(): void{
    this.editStudent.patchValue({
      rollNumber: this.student.rollNumber,
      name: this.student.name,
      image: this.student.imagePath
    });
    this.imagePreview = this.student.imagePath
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editStudent.patchValue({ image: file });
    this.editStudent.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  saveStudent(): boolean{
    if(this.editStudent.valid){
      this.student.rollNumber = this.formControls.rollNumber.value;
      this.student.name = this.formControls.name.value;
      this.student.imagePath = this.editStudent.value.image;
      if(this.editMode){
        this.subSave = this.studentService.updateSudent(this.student).subscribe(data=>{
          if(data?.status == "success"){
            if(data?.statusCode == "V00"){
              this.router.navigate(['student','list']);
            }else if(data?.statusCode == "V01"){
              console.log(data?.message)
            }
          } else if(data?.status == "fail"){
            console.log(data?.message)
          }
        })
      }else{
        this.subSave = this.studentService.addSudent(this.student).subscribe(data=>{
          if(data?.message == "Student added successfully!"){
            this.router.navigate(['student','list']);
          }else if(data?.message == "Duplicate roll number!"){
            console.log(data?.message)
          }
        })
      }
      return true;
    }else{
      this.editStudent.markAllAsTouched();
    }
    return false;
  }
  back(): void{
    this.router.navigate(['student','list']);
  }
  get formControls(){
    return this.editStudent.controls;
  }
}
