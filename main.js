var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var taskInput = document.querySelector('.task-text');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var submitButton = document.querySelector('.submit-btn');
var activitiesContainer = document.querySelector('.activities-container');
var addNotification = document.querySelector('.add-notification');
var timerSection = document.querySelector('.timer');
var formSection = document.querySelector('.theForm');
var timeButton = document.querySelector('.log-time');

var chosenCategory;
var arrayOfTasks = JSON.parse(localStorage.getItem('task')) || [];
 
window.addEventListener('load', loadStoredTasks);
submitButton.addEventListener('click', countDown);
studyButton.addEventListener('click', selectedCategory);
meditateButton.addEventListener('click', selectedCategory);
exerciseButton.addEventListener('click', selectedCategory);
timeButton.addEventListener('click', storeTasks);

function storeTasks(e) {
  e.preventDefault();
  var healthTask = new HealthTasks(Date.now(), chosenCategory, taskInput.value, minutesInput.value, secondsInput.value);
  arrayOfTasks.push(healthTask);
  healthTask.saveTask(arrayOfTasks);
  displayTasks(healthTask);
  formSection.style.display = 'block';
  timerSection.style.display = 'none';
}

function loadStoredTasks() {
  formSection.style.display = 'block';
  timerSection.style.display = 'none';
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
    if (arrayOfTasks.length) {
       addNotification.innerText = "You haven't logged any activities yet.Complete form on the left to get started";
    } else {
      addNotification.innerText = '';
    }
}

function selectedCategory(e) {
  e.preventDefault();
  chosenCategory = e.target.value;
}

function clearInputs() {
   taskInput.value = ''; 
   minutesInput.value = '';  
   secondsInput.value = ''; 
}

function deleteCardTask(e) {
  var taskCard = e.parentElement;
  var newTasks = arrayOfTasks.filter((task) => task.id !== taskCard.id);
  if (e.className === 'delete') {
      taskCard.remove()
      arrayOfTasks.deleteTask(newTasks);
  }
}

var counter = 0;
var min = 4;
var sec = 10;
var timeLeft = 60;

function convertSeconds(secs) {
  min = Math.floor(secs/60);
  sec = secs % 60;
  return `${min}m : ${sec}s`;
}

function countDown(e) {
  e.preventDefault();
  timerSection.style.display = 'block';
  formSection.style.display = 'none';
  var countDown = document.querySelector('.count-down');
  setInterval(timeIt, 1000);

  function timeIt () {
    counter++;
    var timerShit = convertSeconds(timeLeft - counter);
    countDown.innerHTML = timerShit;
  }
  clearInputs();
}



countDown();


