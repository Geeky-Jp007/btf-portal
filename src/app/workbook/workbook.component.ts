import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-workbook',
  templateUrl: './workbook.component.html',
  styleUrls: ['./workbook.component.scss']
})
export class WorkbookComponent implements OnInit {

  users: any;
  tasks: any;
  alltasks: any;
  currDate = moment();
  fromDate = moment().startOf("isoWeek").format("DD-MM-YYYY");
  endDate = moment().endOf("isoWeek").format("DD-MM-YYYY");

  constructor(public router: Router) {
    firebase.firestore().collection("users").get()
    .then((querySnapshot)=>{
      this.users = querySnapshot.docs.map(doc=>{
        let temp = doc.data();
        temp.userId = doc.id;
        return temp;
      });
    })
    firebase.firestore().collection("tasks").get()
    .then((querySnapshot)=>{
      this.alltasks = querySnapshot.docs.map(doc=>{
        let temp = doc.data();
        temp.id = doc.id;
        let userInfo = this.users.find(user=>user.userId == temp.userId);
        temp.userName = userInfo.firstName+" "+userInfo.lastName;
        temp.date = new Date(temp.date.seconds*1000);
        return temp;
      });
      console.log(this.users, this.tasks);
      this.refreshTasks();
    })  
  }

  ngOnInit(): void {
  }

  refreshTasks(){
    let from = moment(this.fromDate, "DD-MM-YYYY");
    let to = moment(this.endDate, "DD-MM-YYYY");
    this.tasks = this.alltasks.filter(task=>{
      let currDate = moment(task.date);
      return (from<=currDate && to>=currDate); 
    })
  }

  showTask(id){
    console.log(id);
    this.router.navigate(['/showtask', id])
  }

  leftClick(){
    let date = moment(this.fromDate, "DD-MM-YYYY").subtract(1,"day");
    console.log(date);
    this.fromDate = moment(date).startOf("isoWeek").format("DD-MM-YYYY");
    this.endDate = moment(date).endOf("isoWeek").format("DD-MM-YYYY");
    console.log(this.fromDate, this.endDate);
    this.refreshTasks();
  }

  rightClick(){
    let date = moment(this.endDate, "DD-MM-YYYY").add(1,"day");
    this.fromDate = moment(date).startOf("isoWeek").format("DD-MM-YYYY");
    this.endDate = moment(date).endOf("isoWeek").format("DD-MM-YYYY");
    console.log(this.fromDate, this.endDate);
    this.refreshTasks();
  }


}
