class HealthTasks {
  constructor(id, category, task=[], minutes, seconds ) {
     this.id = id;
     this.category = category;
     this.task = task;
     this.minutes = minutes;
     this.seconds = seconds;
  }

   saveTask(taskList) {
     var stringifiedTask = JSON.stringify(taskList);
     localStorage.setItem('task', stringifiedTask);
   }

}