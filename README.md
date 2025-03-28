# User Manager

A simple User Manager application built with **React** and **Bootstrap**, using the Reqres API for user management. This app allows users to **add, edit, and delete users** while providing real-time success and error messages.

---

## Features
- 📝 Add new users
- ✏️ Edit existing users
- ❌ Delete users
- 🔄 Paginated user list
- ✅ Real-time success & error messages
- 🎨 Styled with Bootstrap for responsiveness

---

## Prerequisites
Ensure you have the following installed before running the application:
- **Node.js** (v14 or later) ➜ [Download Here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

---

## Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/SHAURYA-MAG-CYBER/Global-GS-.git
   ```
2. **Navigate into the project folder**
   ```sh
   cd task-manager
   ```
3. **Install dependencies**
   ```sh
   npm install
   ```
   _or_
   ```sh
   yarn install
   ```

---

## Running the Application
To start the development server, run:
```sh
npm run dev
```
_or_
```sh
yarn dev
```
The app will be available at:
```sh
http://localhost:5173
```

---

## API Integration
This application uses **Reqres API** to fetch and manage user data.
- API Endpoint: `https://reqres.in/api/users`

---

## Project Structure
```
📂 task-manager
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 AddEditUserModal.jsx
 ┃ ┃ ┣ 📜 UserList.jsx
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 TaskPage.jsx
 ┃ ┣ 📂 styles
 ┃ ┃ ┣ 📜 global.css
 ┃ ┣ 📜 App.jsx
 ┃ ┣ 📜 main.jsx
 ┣ 📜 package.json
 ┣ 📜 README.md
```

---

## Available Scripts
- **`npm run dev`** - Starts the development server
- **`npm run build`** - Builds the project for production
- **`npm run lint`** - Runs the linter to check for errors

---

## Technologies Used
- **React** (Frontend framework)
- **Bootstrap** (Styling and layout)
- **Reqres API** (Mock API for users)
- **Vite** (Fast build tool for React)

---

## Contributing
Want to improve this project? Feel free to submit a pull request!

---

## License
This project is **open-source** and available under the [MIT License](LICENSE).

