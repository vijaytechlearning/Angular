import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.css']
})
export class SubSectionComponent implements OnInit {
  @Input() subSectionIndex: number;
  @Input() subSections: FormArray;
  @Input() subSection: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  removeSubSection() {
    this.subSections.removeAt(this.subSectionIndex);
  }

}
