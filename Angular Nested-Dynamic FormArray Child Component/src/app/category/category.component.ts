import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() categories: FormArray;
  @Input() category: FormGroup;
  @Input() newSection: FormGroup;
  @Input() newSubSection: FormGroup;
  @Input() catIndex: number;
  @Input() sectionName: string;
  @Input() subSectionName: string;
  constructor() { }

  ngOnInit(): void {}

  removeCategory() {
    this.categories.removeAt(this.catIndex);
  }

  sections(): FormArray {
    return this.categories
      .at(this.catIndex)
      .get(this.sectionName) as FormArray;
  }

  addSection() {
    this.sections().push(this.newSection);
  }
}
