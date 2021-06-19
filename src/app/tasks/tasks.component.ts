import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  allTasks: any;

  constructor(public router: Router) {
    let userId = firebase.auth().currentUser.uid;
    firebase.firestore().collection("tasks").where("userId", "==", userId).orderBy("date", "desc").get()
    .then((querySnapshot)=>{
      this.allTasks = querySnapshot.docs.map(doc=>{
        let temp = doc.data();
        temp.id = doc.id;
        temp.date = new Date(temp.date.seconds*1000);
        return temp;
      });
    })
  }

  ngOnInit(): void {
  }

  showTask(id){
    console.log(id);
    this.router.navigate(['/showtask', id])
  }

}
