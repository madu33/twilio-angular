import { Component, OnInit } from '@angular/core';
import {NumbersAndMessageDTO} from "../../dto/NumbersAndMessageDTO";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  numberAndMessage=new NumbersAndMessageDTO();
  mainListNumber: number[] = new Array<number>();
  constructor() { }

  ngOnInit(): void {
  }

  file:any;
  fileChanged(e:any) {
    this.file = e.target.files[0];
    this.uploadDocument(this.file);
  }

  uploadDocument(file:File) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      // @ts-ignore
      this.mainListNumber=fileReader.result;
    }
    fileReader.readAsText(this.file);
  }

  submit() {

  }
}
