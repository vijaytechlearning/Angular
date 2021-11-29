import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Student } from '../student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getSudents(): Observable<any> {
    return this.http.get(this.apiUrl+"/api/student").pipe(
      tap(data => data.students = data.students.map(std => {
        return{
          id: std._id,
          rollNumber: std.rollNumber,
          name: std.name,
          imagePath: std.imagePath
        }
      }),
      catchError(this.handleError))
    )
  }

  getSudent(rollNumber: number): Observable<any> {
    return this.http.get<{status: string, statusCode: string, message: string, student: {_id?: string, name: string, rollNumber: number, id?: string, imagePath: string}}>(this.apiUrl+"/api/student/"+rollNumber).pipe(
      tap(data => data.student = {
          id: data.student._id,
          rollNumber: data.student.rollNumber,
          name: data.student.name,
          imagePath: data.student.imagePath
        }),
      catchError(this.handleError)
    )
  }

  addSudent(student: Student): Observable<any> {
    const postData = new FormData();
    postData.append("rollNumber", student.rollNumber.toString());
    postData.append("name", student.name);
    postData.append("image", student.imagePath, student.name);
    return this.http.post(this.apiUrl+"/api/student", postData).pipe(
      catchError(this.handleError)
    )
  }

  updateSudent(student: Student): Observable<any> {
    let postData: Student | FormData;
    if (typeof student.imagePath === "object") {
      postData = new FormData();
      postData.append("id", student.id);
      postData.append("rollNumber", student.rollNumber.toString());
      postData.append("name", student.name);
      postData.append("image", student.imagePath, student.name);
    } else {
      postData = student
    }
    return this.http.put(this.apiUrl+"/api/student", postData).pipe(
      catchError(this.handleError)
    )
  }

  deleteSudent(id: string): Observable<any> {
    return this.http.delete<{status: string, statusCode: string, students?: any, message: string}>(this.apiUrl+"/api/student/"+id).pipe(
      tap(data => data.students = data?.students?.map(std => {
        return{
          id: std._id,
          rollNumber: std.rollNumber,
          name: std.name,
          imagePath: std.imagePath
        }
      })),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never>{
    let message = "";
    if(error.error instanceof ErrorEvent){
      message = `An error occurred: ${error.error.message}`
    }else{
      message = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(message);
  }
}
