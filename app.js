// Define the buttons, todoDiv, and timeTrackingData
const buttons = document.querySelectorAll('.toggle-button');
const todoDiv = document.createElement('div');
let timeTrackingData = [];

// Add a class to the todoDiv and append it to the container
todoDiv.classList.add('todo');
const container = document.querySelector('.container');
container.append(todoDiv);

// Define a function to fetch data from 'data.json'
async function fetchData() {
  const response = await fetch('data.json');
  timeTrackingData = (await response.json()).Todo;
  createTopElements();
  updateTime('h1');
}

// Create top elements based on timeTrackingData
function createTopElements() {
  todoDiv.innerHTML = timeTrackingData.map(item => `
    <div class="top">
      <div class="work">
        <h2>${item.title}</h2>
        <div class="time">
          <h1>0hrs</h1>
          <p></p>
        </div>
      </div>
    </div>
  `).join('');
}

// Update time elements based on the selected timeframe
function updateTime(timeframe) {
  const timeframes = {
      daily: 'Yesterday',
      weekly: 'Last Week',
      monthly: 'Last Month',
  };

  const timePeriodText = timeframes[timeframe]; 

  // Loop through top elements and update their content
  document.querySelectorAll('.top').forEach((currentItem, i) => {
      const { title, timeframes } = timeTrackingData[i];
      const { current, previous } = timeframes[timeframe];
      const [titleElement, timeElement, previousTimeElement] = currentItem.querySelectorAll('h2, h1, p');

      // Update the content of the title, current time, and previous time elements
      titleElement.innerHTML = `${title} <i class="fas fa-ellipsis"></i`;
      timeElement.textContent = `${current}hrs`;
      previousTimeElement.textContent = `${timePeriodText} - ${previous}hrs`;
  });
}

// Add event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedTimeframe = button.textContent.toLowerCase();

      // Remove the 'active' class from all buttons and add it to the clicked button
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      // Call the function to update the content based on the selected timeframe
      updateTime(selectedTimeframe);
    });
  });
  // Fetch data when the DOM content is loaded
  fetchData();
});
