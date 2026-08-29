// src/js/todo.js
const STORAGE_KEY = 'iyf-week03-todos:v1'

const el = selector => document.querySelector(selector)
const elAll = selector => Array.from(document.querySelectorAll(selector))

// Elements
const form = el('#add-form')
const input = el('#new-task')
const list = el('#todo-list')
const filters = elAll('.filter')
const clearCompletedBtn = el('#clear-completed')
const taskCount = el('#task-count')
const status = el('#status')

let todos = loadTodos()
let activeFilter = 'all'

render()

form.addEventListener('submit', e => {
  e.preventDefault()
  const text = input.value.trim()
  if (!text) return
  const todo = { id: Date.now().toString(), text, completed: false, createdAt: new Date().toISOString() }
  todos.unshift(todo)
  saveAndRender()
  input.value = ''
  input.focus()
})

filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'))
  filters.forEach(b => b.setAttribute('aria-selected', 'false'))
  btn.classList.add('active')
  btn.setAttribute('aria-selected', 'true')
  activeFilter = btn.dataset.filter
  render()
}))

clearCompletedBtn.addEventListener('click', () => {
  const before = todos.length
  todos = todos.filter(t => !t.completed)
  if (todos.length === before) return
  saveAndRender()
})

function loadTodos(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('Failed to load todos', err)
    return []
  }
}

function saveTodos(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function saveAndRender(){
  saveTodos()
  render()
}

function render(){
  list.innerHTML = ''
  const visible = todos.filter(t => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'active') return !t.completed
    if (activeFilter === 'completed') return t.completed
  })

  if (visible.length === 0){
    const li = document.createElement('li')
    li.className = 'todo-item'
    li.textContent = 'No tasks yet.'
    list.appendChild(li)
  }

  visible.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item' + (todo.completed ? ' completed' : '')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = !!todo.completed
    checkbox.setAttribute('aria-label', `Mark task ${todo.text} complete`)
    checkbox.addEventListener('change', () => {
      toggleComplete(todo.id)
    })

    const content = document.createElement('div')
    content.className = 'content'
    content.textContent = todo.text
    content.contentEditable = 'true'
    content.setAttribute('role','textbox')
    content.setAttribute('aria-label','Edit task')
    content.addEventListener('blur', () => {
      const newText = content.textContent.trim()
      if (!newText){
        // if cleared, delete the task
        deleteTodo(todo.id)
      } else if (newText !== todo.text){
        updateText(todo.id, newText)
      }
    })
    content.addEventListener('keydown', e => {
      if (e.key === 'Enter'){
        e.preventDefault()
        content.blur()
      }
    })

    const actions = document.createElement('div')
    actions.className = 'actions'

    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('aria-label', `Delete ${todo.text}`)
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id))

    actions.appendChild(deleteBtn)

    li.appendChild(checkbox)
    li.appendChild(content)
    li.appendChild(actions)

    list.appendChild(li)
  })

  taskCount.textContent = todos.length
  status.textContent = `${todos.length} task(s) — ${todos.filter(t => t.completed).length} completed`
}

function toggleComplete(id){
  todos = todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)
  saveAndRender()
}

function deleteTodo(id){
  todos = todos.filter(t => t.id !== id)
  saveAndRender()
}

function updateText(id, text){
  todos = todos.map(t => t.id === id ? {...t, text} : t)
  saveAndRender()
}

// expose for debugging
window._iyf_todos = {get: () => todos, clear: () => { todos = []; saveAndRender() }}
