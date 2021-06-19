import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-submit-task',
  templateUrl: './submit-task.component.html',
  styleUrls: ['./submit-task.component.scss']
})
export class SubmitTaskComponent implements OnInit {

  myForm: FormGroup;
  message: string = "";
  userError: any;
  currentWeek: boolean = false;
  

  constructor(public fb:FormBuilder, public authService: AuthService, public router:Router) {
    this.myForm = this.fb.group({
      tasks: ['', [Validators.required]],
      addTasks: [''],
      completed: [''],
      newIdeas: ['']
    })

    let userId = firebase.auth().currentUser.uid;

    firebase.firestore().collection("tasks").where("userId", "==", userId).orderBy("date", "desc").limit(1).get()
    .then((querySnapshot)=>{
      let tasksData = querySnapshot.docs.map(doc=>{
        let temp = doc.data();
        temp.date = new Date(temp.date.seconds*1000);
        return temp;
      });
      console.log(tasksData);
      let currDate = new Date();
      if(moment(currDate).isoWeek()!=moment(tasksData[0].date).isoWeek())
        this.currentWeek = true;
    })

  }


  onSubmit(myform){
    let tasks: string = myform.value.tasks;
    let addTasks: string = myform.value.addTasks;
    let completed: string = myform.value.completed;
    let newIdeas: string = myform.value.newIdeas;
    let userId = firebase.auth().currentUser.uid;
  

    firebase.firestore().collection("tasks").add({
      task: tasks,
      addTasks: addTasks,
      completed: completed,
      newIdeas: newIdeas,
      userId: userId,
      date: firebase.firestore.Timestamp.now(),
    })
    .then(()=>{
      this.message="Task has been submit successfully."
      this.router.navigate(['/tasks']);
    })
    .catch((error)=>{
    this.userError = error;
    })
  }

  ngOnInit(): void {
  }

}
