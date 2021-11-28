import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {

  title: string = "";
  constructor(public titleService: TitleService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
  }

}
