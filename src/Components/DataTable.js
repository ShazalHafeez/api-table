import React, { useState, useEffect } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);

  // Function to delete a row
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  // Function to open modal and set current user data
  const handleEdit = (id) => {
    const userToEdit = data.find((item) => item.id === id);
    setCurrentUser(userToEdit);
    setIsModalOpen(true);
  };

  // Function to handle modal submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUsers = data.map((item) =>
      item.id === currentUser.id ? currentUser : item
    );
    setData(updatedUsers);
    setIsModalOpen(false);
    setCurrentUser({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete ${item.name}`}
                >
                  <i style={{ color: "#C70039" }} className="fa fa-trash"></i>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal for editing user data */}
      <div
        className="modal"
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit User</h5>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control text-secondary"
                    value={currentUser.name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control text-secondary"
                    value={currentUser.username || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control text-secondary"
                    value={currentUser.email || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-around my-3">
                  <button type="submit" className="btn btn-primary w-50 mx-2">
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary w-50"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
