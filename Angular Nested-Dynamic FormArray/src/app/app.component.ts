import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'form-array';
  categoryForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categories: this.fb.array([])
    });
  }

  categories(): FormArray {
    return this.categoryForm.get('categories') as FormArray;
  }

  newCategory(): FormGroup {
    return this.fb.group({
      categoryID: '',
      categoryName: '',
      sections: this.fb.array([])
    });
  }

  addCategory() {
    this.categories().push(this.newCategory());
  }

  removeCategory(catIndex: number) {
    this.categories().removeAt(catIndex);
  }

  sections(catIndex: number): FormArray {
    return this.categories()
      .at(catIndex)
      .get('sections') as FormArray;
  }

  newSection(): FormGroup {
    return this.fb.group({
      sectionID: '',
      sectionName: '',
      subSections: this.fb.array([])
    });
  }

  addSection(catIndex: number) {
    this.sections(catIndex).push(this.newSection());
  }

  removeSection(catIndex: number, sectionIndex: number) {
    this.sections(catIndex).removeAt(sectionIndex);
  }

  subSections(catIndex: number, sectionIndex: number): FormArray {
    let categories = this.categories()
      .at(catIndex)
      .get('sections') as FormArray;
    return categories.at(sectionIndex).get('subSections') as FormArray;
  }

  subSection(): FormGroup {
    return this.fb.group({
      subSectionName: ''
    });
  }

  addSubSection(catIndex: number, sectionIndex: number){
    this.subSections(catIndex, sectionIndex).push(this.subSection());
  }

  removeSubSection(catIndex: number, sectionIndex: number, subSectionIndex: number) {
    this.subSections(catIndex, sectionIndex).removeAt(subSectionIndex);
  }

  onSubmit() {
    // console.log(this.categoryForm.value);
  }
}
