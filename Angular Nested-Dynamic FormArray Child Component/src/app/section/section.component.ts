import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() sections: FormArray;
  @Input() section: FormGroup;
  @Input() newSubSection: FormGroup;
  @Input() sectionIndex: number;
  @Input() subSectionName: string;
  constructor() { }

  ngOnInit(): void {
  }

  removeSection() {
    this.sections.removeAt(this.sectionIndex);
  }

  subSections(): FormArray {
    return this.sections.at(this.sectionIndex).get(this.subSectionName) as FormArray;
  }

  addSubSection(){
    this.subSections().push(this.newSubSection);
  }

}
