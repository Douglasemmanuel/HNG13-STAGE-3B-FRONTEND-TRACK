
# 📝 Todo App with Convex Backend

A simple and elegant **ToDo application** built with **React Native** and **Convex** as the backend. Manage your tasks efficiently by adding, completing, and filtering tasks into **All**, **Active**, and **Completed** categories.

---

## Features

* ✅ Add new tasks and save them to Convex
* 🔹 Mark tasks as completed
* 🔹 Filter tasks by **All**, **Active**, or **Completed**
* 🌙 Supports **dark/light mode**
* 💙 Clean and minimalistic UI

---

## Screenshots

* **Dark Mode Screen**
  <img src="assets/images/homescreen.jpeg" alt="Main Screen" width="400" />

* **Light Mode Screen**
  <img src="assets/images/allproducts.jpeg" alt="Main Screen" width="400" />
---


* **Video Demonstration:**
  Watch the full workflow of the app in action: [Demo Video]()

---






## Installation

1. **Clone the repository**

```bash
git clone   https://github.com/Douglasemmanuel/HNG13-STAGE-3B-FRONTEND-TRACK.git
cd todo_app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up Convex backend**

```bash
npm install convex
# or
yarn add convex
```

4. **Configure Convex**

* Create a Convex project:

```bash
npx convex dev
```

* Copy the project URL and update `convex/convex.json` in your project.

5. **Run the app**

```bash
npx expo start

```

---

## Usage

* Tap **All**, **Active**, or **Completed** to filter tasks
* Tap a task to mark it as complete (updates in Convex)
* Add new tasks using the input field at the bottom (saved to Convex)

---

## Convex Backend

* **Tasks Collection:** Stores all tasks with fields:

  * `id` (auto-generated)
  * `title` (string)
  * `completed` (boolean)
* **Query Examples:**

```Convex Backend
import { useQuery, useMutation } from 'convex/react';

const tasks = useQuery('getTasks'); // Fetch all tasks
const addTask = useMutation('addTask'); // Add a new task
const toggleTask = useMutation('toggleTask'); // Toggle completed status
```

* Your app updates in real-time thanks to Convex’s live queries.

---

## Folder Structure

```
/TodoApp
│
├── /components      # UI Components (All, Active, Completed)
├── /screens         # Main screens
├── /convex          # Convex backend functions and schemas
├── App.js           # Entry point
└── package.json
```

---


## License

This project is licensed under the MIT License.

---

