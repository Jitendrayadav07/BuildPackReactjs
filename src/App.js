import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:2000/api/roles";

  const fetchRoles = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setRoles(data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSubmit = async () => {
    if (!roleName) return alert("Role name required");

    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: roleName }),
      });
      setEditId(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: roleName }),
      });
    }

    setRoleName("");
    fetchRoles();
  };

  const handleEdit = (role) => {
    setRoleName(role.name);
    setEditId(role.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchRoles();
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Role Management</h2>

        <div className="form">
          <input
            type="text"
            placeholder="Enter role name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <button className="primary" onClick={handleSubmit}>
            {editId ? "Update Role" : "Create Role"}
          </button>
        </div>

        <ul className="role-list">
          {roles.map((role) => (
            <li key={role.id}>
              <span>{role.name}</span>
              <div className="actions">
                <button className="edit" onClick={() => handleEdit(role)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(role.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
