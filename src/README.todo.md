## To-Do Application (Local Storage)

I added a simple accessible To‑Do list app that uses localStorage to persist tasks across browser sessions.

Files added:
- src/todo.html — the app page you can open in a browser
- src/css/todo.css — styles for the app
- src/js/todo.js — functionality (add/edit/delete/complete/filter/persist)

How to open locally:
1. Clone the repo and open `src/todo.html` in your browser, or use a static server:
   - python3 -m http.server 8000  (then visit http://localhost:8000/src/todo.html)

Features:
- Add tasks via the input form
- Edit tasks inline (press Enter or blur to save)
- Toggle complete with checkbox
- Delete tasks
- Filter tasks: All / Active / Completed
- Clear completed tasks
- Data stored under localStorage key: `iyf-week03-todos:v1`

Accessibility:
- Keyboard-editable tasks
- ARIA attributes for filters and live region

If you want, I can:
- Hook the app into the main index (add a navbar link)
- Add due dates or priorities
- Add tests

