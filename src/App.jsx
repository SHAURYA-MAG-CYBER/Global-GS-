// import { useState } from 'react'
import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
        <>
        <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/user/list" element={<ProtectedRoute><TaskPage/></ProtectedRoute>}/>
        </Routes>
        </>
      
  )
}

export default App;
