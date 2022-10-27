import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "../../service/dashboard.service";
import {NumberDTO} from "../../dto/NumberDTO";
import {MessageAndTime} from "../../dto/MessageAndTime";
import {NgToastService} from "ng-angular-popup";





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fileContent: any;

  date:Date|undefined;
  time:string|undefined;
  message:string|undefined;

  //set number list from csv file
  numberList: Array<NumberDTO> = new Array<NumberDTO>();
  messageAndTime=new MessageAndTime();

  constructor(private dashboardService:DashboardService,private toast: NgToastService) { }

  ngOnInit(): void {
  }


  public onChange(eve: Event): void {
    let target=eve.target;
    // @ts-ignore
    let selectFile=target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsText(selectFile);
    fileReader.onload=()=>{
      let result = fileReader.result;
      this.fileContent = result;
    }

  }
  setNumbers(){
    this.numberList= new Array<NumberDTO>();
    let split=this.fileContent.split('\n');
    for (let i=0;i<split.length;i++){
      let numberDTO = new NumberDTO();
      if(split[i].length>=10){
        numberDTO.number=split[i];
        this.numberList.push(numberDTO);
      }
    }
    console.log(this.numberList.length);
    if(this.numberList.length>0){
      this.toast.success({detail:'Successful Added',summary:'Added Phone Numbers',duration:5000});
    }else{
      this.toast.error({detail:'Please Try Again',summary:'No Number Here',duration:5000});
    }

  }

  setTimeAndMessage() {

    let date=Number(this.date?.getDate());
    let month = Number(this.date?.getMonth());
    let hour=Number(this.time?.split(":")[0]);
    let minute=Number(this.time?.split(":")[1]);

    this.messageAndTime.message=this.message;
    this.messageAndTime.month=month;
    this.messageAndTime.day=date;
    this.messageAndTime.hour=hour;
    this.messageAndTime.minute=minute;

    console.log('---------------------------------------------------');
    console.log(month);
    console.log(date);
    console.log(hour);
    console.log(minute);
    console.log('---------------------------------------------------');
    this.dashboardService.saveNumberList(this.numberList).subscribe(obj=>{
      if(obj){
        this.dashboardService.setTimeAndMessage(this.messageAndTime).subscribe(obj=>{
          this.toast.success({detail:'Successful Added',summary:'',duration:5000});
        });
      }else{
        this.toast.error({detail:'Please Check Server',summary:'',duration:5000});
      }
    });


  }

}
