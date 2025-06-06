import './style.css'

class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
    this.taskInput = document.getElementById('taskInput')
    this.addBtn = document.getElementById('addBtn')
    this.taskList = document.getElementById('taskList')
    this.totalTasks = document.getElementById('totalTasks')
    this.completedTasks = document.getElementById('completedTasks')
    this.clearCompleted = document.getElementById('clearCompleted')
    this.clearAll = document.getElementById('clearAll')
    
    this.init()
  }
  
  init() {
    this.addBtn.addEventListener('click', () => this.addTask())
    this.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask()
    })
    this.clearCompleted.addEventListener('click', () => this.clearCompletedTasks())
    this.clearAll.addEventListener('click', () => this.clearAllTasks())
    
    this.render()
  }
  
  addTask() {
    const text = this.taskInput.value.trim()
    if (!text) return
    
    const task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toLocaleString()
    }
    
    this.tasks.push(task)
    this.taskInput.value = ''
    this.saveAndRender()
  }
  
  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.saveAndRender()
    }
  }
  
  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id)
    this.saveAndRender()
  }
  
  clearCompletedTasks() {
    this.tasks = this.tasks.filter(t => !t.completed)
    this.saveAndRender()
  }
  
  clearAllTasks() {
    this.tasks = []
    this.saveAndRender()
  }
  
  saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    this.render()
  }
  
  render() {
    // Update stats
    const total = this.tasks.length
    const completed = this.tasks.filter(t => t.completed).length
    this.totalTasks.textContent = `Total: ${total}`
    this.completedTasks.textContent = `Completed: ${completed}`
    
    // Render tasks
    this.taskList.innerHTML = this.tasks.map(task => `
      <li class="task ${task.completed ? 'completed' : ''}">
        <div class="task-content">
          <input type="checkbox" ${task.completed ? 'checked' : ''} 
                 onchange="taskManager.toggleTask(${task.id})">
          <span class="task-text">${task.text}</span>
          <small class="task-date">${task.createdAt}</small>
        </div>
        <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})">×</button>
      </li>
    `).join('')
  }
}

// Initialize the app
window.taskManager = new TaskManager()

// Add some demo data for testing
if (window.taskManager.tasks.length === 0) {
  window.taskManager.tasks = [
    { id: 1, text: 'Test Jenkins pipeline', completed: false, createdAt: new Date().toLocaleString() },
    { id: 2, text: 'Build Docker image', completed: true, createdAt: new Date().toLocaleString() },
    { id: 3, text: 'Deploy to staging', completed: false, createdAt: new Date().toLocaleString() }
  ]
  window.taskManager.saveAndRender()
}