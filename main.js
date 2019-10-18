var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var taskInput = document.querySelector('.task-text');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var submitButton = document.querySelector('.submit-btn');
var activitiesContainer = document.querySelector('.activities-container');
var addNotification = document.querySelector('.add-notification');
var chosenCategory;
var arrayOfTasks = JSON.parse(localStorage.getItem('task')) || [];

window.addEventListener('load', loadStoredTasks);
window.addEventListener('load', displayEmptyMessage);
submitButton.addEventListener('click', storeTasks);
studyButton.addEventListener('click', selectedCategory);
meditateButton.addEventListener('click', selectedCategory);
exerciseButton.addEventListener('click', selectedCategory);



function storeTasks(e) {
  e.preventDefault();
  var healthTask = new HealthTasks(Date.now(), chosenCategory, taskInput.value, minutesInput.value, secondsInput.value);
  arrayOfTasks.push(healthTask);
  healthTask.saveTask(arrayOfTasks);
  displayTasks(healthTask);
  displayEmptyMessage();
}

function loadStoredTasks() {
  arrayOfTasks = arrayOfTasks.map(function(usedTask) {
    var storedTasks = new HealthTasks(usedTask.id, usedTask.category, usedTask.task, usedTask.minutes, usedTask.seconds);
    displayTasks(storedTasks);
    return storedTasks;
  })
}

function displayTasks(task) {
    activitiesContainer.insertAdjacentHTML('afterbegin', `
      <section class='users-task' id=${task.id}>
        <div class='task-info'> 
          <h3>${task.category}</h3>
          <p> ${task.minutes}MIN  ${task.seconds}SECONDS</p>
          <p>${task.task}</p>
        </div>
        <button class='delete' onclick='deleteCardTask(this)' >X</button> 
       </section>
    `)
}

function displayEmptyMessage() {
    if (arrayOfTasks.length === 0) {
       addNotification.innerText = "0 activities. Complete form on the left to get started";
    } else {
      addNotification.innerText = '';
    }
}

function selectedCategory(e) {
  e.preventDefault();
  chosenCategory = e.target.value;
}

function deleteCardTask(e) {
  var taskCard = e.parentElement;
  var newTasks = arrayOfTasks.filter((task) => task.id !== taskCard.id);
  if (e.className === 'delete') {
      taskCard.remove()
      arrayOfTasks.deleteTask(newTasks);
  }
}