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
    // If required to fill/pre populate data from Object then call below method(setCategories)
    this.setCategories();
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

  newSection(): FormGroup {
    return this.fb.group({
      sectionID: '',
      sectionName: '',
      subSections: this.fb.array([])
    });
  }

  newSubSection(): FormGroup {
    return this.fb.group({
      subSectionName: ''
    });
  }

  onSubmit() {
    // console.log(this.categoryForm.value);
  }

  setCategories(){
    let list = this.getCategories || { "categories": []};
    if(list.categories){

      // set Categories here
      for (let index = 0; index < list.categories.length; index++) {
        const category = list.categories[index];
        let id = category.categoryID || "";
        let name = category.categoryName || "";
        let cat = this.newCategory();
        cat.controls.categoryID.setValue(id);
        cat.controls.categoryName.setValue(name);
        this.categories().push(cat);

        // set Section here
        for (let j = 0; j < category.sections.length; j++) {
          const section = category.sections[j];
          let id = section.sectionID || "";
          let name = section.sectionName || "";
          let sec = this.newSection();
          sec.controls.sectionID.setValue(id);
          sec.controls.sectionName.setValue(name);
          let ss = this.categories().at(index).get('sections') as FormArray;
          ss.push(sec);

          // set Sub Section here
          for (let k = 0; k < section.subSections.length; k++) {
            const subSection = category.sections[j].subSections[k];
            let name = subSection.subSectionName || "";
            let sec = this.newSubSection();
            sec.controls.subSectionName.setValue(name);
            let ss = this.categories().at(index).get('sections') as FormArray;
            (ss.at(j).get('subSections') as FormArray).push(sec);
          }
        }
      }
    }
  }

  get getCategories(){
    return { "categories": [ { "categoryID": "1", "categoryName": "Category 1", "sections": [ { "sectionID": "1", "sectionName": "Section 1", "subSections": [ { "subSectionName": "Sub Sections Name 1" }, { "subSectionName": "Sub Sections Name 2" } ] }, { "sectionID": "2", "sectionName": "Section 2", "subSections": [ { "subSectionName": "Sub Sections Name 1" }, { "subSectionName": "Sub Sections Name 2" } ] } ] }, { "categoryID": "2", "categoryName": "Category 2", "sections": [ { "sectionID": "1", "sectionName": "Section 1", "subSections": [ { "subSectionName": "Sub Sections Name 1" } ] } ] } ] }
  }
}
