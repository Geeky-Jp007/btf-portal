import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit {

  task: any;
  constructor(public activatedRoute: ActivatedRoute) {
    let taskId = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(taskId)

    firebase.firestore().collection("tasks").doc(taskId).get().then((docSnapshot)=>{
      this.task =  docSnapshot.data();
      this.task.date = new Date(this.task.date.seconds*1000);
      console.log(this.task);
    })
  }

  ngOnInit(): void {
  }

}
