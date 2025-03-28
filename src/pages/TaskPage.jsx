import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ModalDialog, ModalFooter, ModalTitle } from "react-bootstrap";
import '../styles/UserPage.css'

const API_URL = "https://reqres.in/api";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [username,setUsername] = useState("");
  const [useremail,setUseremail] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadUser(currentPage);
  }, [currentPage]);

  const loadUser = async (page) => {
    try {
      const response = await axios.get(`${API_URL}/users?page=${page}`);
      setTasks(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setErrorMessage("Failed to load tasks: " + error);
    }
  };

  const handleCreateUser = async () => {
    if (!newTask.trim()) {
      setErrorMessage("User name cannot be empty.");
      setSuccessMessage(""); // Clear success message
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/users`, {name:newTask});
      loadUser();
      if(response.status == 201){
        setSuccessMessage("User added successfully!");
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage("Failed to add user");
      }
      setNewTask("");
    } catch (error) {
      setErrorMessage("Failed to add user. Please try again: "+ error);
      setSuccessMessage("");
    }
  };

  const handleSave = async (selectedUser) => {
    try {
      await axios.put(`${API_URL}/users/${selectedUser.id}`, {
        name: selectedUser.first_name + " " + selectedUser.last_name,
      });
      loadUser();
      setIsOpen(false);
      setSuccessMessage("User Updated Successfully")
    } catch (error) {
      setErrorMessage("Failed to update user: " + error);
    }
  };

  const handleEditUser =  (currUser) => {
    try {
      console.log(selectedUser);
      console.log("edit user called");
      setSelectedUser(currUser);
      console.log(currUser);
      setIsOpen(true);
      console.log(isOpen);
    } catch (error) {
      setErrorMessage("Failed to update user: " + error);
    }
  };

  useEffect(() => {
    console.log("isOpen changed:", isOpen);
  }, [isOpen]);

  const handleDeleteUser = async (user) => {
    const confirmDelete = window.confirm("Do you want to delete the user?");
    if(!confirmDelete) return;
    try {
      await axios.delete(`${API_URL}/users/${user.id}`);
      loadUser();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setErrorMessage("Failed to delete user.");
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setUsername(selectedUser.first_name + " " + selectedUser.last_name);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      setUseremail(selectedUser.email);
    }
  }, [selectedUser]);

  return (
    <>
      {isOpen && <div className="modal-backdrop">(
          <>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <ModalDialog>
                <Modal.Header closebutton>
                  <ModalTitle className="ModalTitle">Edit User</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <div className="form-group">
                      <label className="col-form-label">User Name:</label>
                      {/* <input type="text" className="form-control" id="recipient-name"></input> */}
                      <input
                        type="text"
                        className="w-full border px-3 py-2 mb-4 ml-0"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="col-form-label">Email:</label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 mb-4 set"
                        value={useremail}
                        onChange={(e) => setUseremail(e.target.value)}
                      />
                    </div>
                  </form>
                  
                  <ModalFooter>
                    <Button variant="primary " onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="secondary edit-button" onClick={() => setIsOpen(false)}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal.Body>
              </ModalDialog>
            </div>
          </>
        )</div>}
      <div>
      <h2>Task List</h2>
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={logout}>
          <i className="fas fa-sign-out-alt me-2 mb-20"></i> Logout
        </button>
      </div>
      <div className="add-user-btn" >
        <input
          type="text"
          className="form-control"
          placeholder="New User"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary me-2 " onClick={handleCreateUser}>
          Add User
        </button>
        {successMessage && <p className="alert alert-success">{successMessage}</p>}
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      </div>
      <div className="table-container">
        <table className="user-table">
          <thead className="bg-gray-100">
            <tr>
              <th style={{ border: "2px solid" }}>Id</th>
              <th
                className="border border-gray-300 px-5 py-6 text-left"
                style={{ border: "2px solid" }}
              >
                Avatar
              </th>
              <th
                className="border border-gray-300 px-5 py-6 text-left"
                style={{ border: "2px solid" }}
              >
                First Name
              </th>
              <th
                className="border border-gray-300 px-5 py-6 text-left"
                style={{ border: "2px solid" }}
              >
                Last Name
              </th>
              <th
                className="border border-gray-300 px-5 py-6 text-left"
                style={{ border: "2px solid" }}
              >
                Email
              </th>
              <th
                className="border border-gray-300 px-5 py-6 text-left"
                style={{ border: "2px solid" }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td>
                  {task.id}
                </td>
                <td>
                  <img src={task.avatar} alt="avatar" className="avatar"></img>
                </td>
                <td>
                  {task.first_name}
                </td>
                <td>
                  {task.last_name}
                </td>
                <td>
                  {task.email}
                </td>
                <td className="action-buttons">
                  <svg
                    className="btn-edit" 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    onClick={() => handleEditUser(task)}
                    style={{ cursor: "pointer", fill: "currentColor" }}
                  >
                    <path d="M20.7 5.2a1.024 1.024 0 0 1 0 1.448l-2.626 2.628-3.35-3.35L17.35 3.3a1.024 1.024 0 0 1 1.448 0zm-4.166 5.614-3.35-3.35-8.509 8.511L3 21l5.025-1.675z" />
                  </svg>
                  <svg
                    className="btn-delete"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={handleDeleteUser}
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <span className="mx-3">Page {currentPage} of {totalPages}</span>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      </div>
    </>    
  );
};

export default TaskPage;
