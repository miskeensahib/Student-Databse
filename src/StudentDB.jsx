import React, { useRef,useState } from "react";
import "./StudentDB.css"; // Import CSS

const StudentDB = () => {
  const inputRef = useRef();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState("");
  const [search, setSearch] = useState(""); // ✅ Search state

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newStudent) return;
    addStudent(newStudent);
    setNewStudent("");
  };

  // Add new student
  const addStudent = (name) => {
    const id = students.length ? students[students.length - 1].id + 1 : 1;
    const newEntry = { id, name };
    setStudents([...students, newEntry]);
  };

  // Delete student
  const handleDelete = (id) => {
    const updatedList = students.filter((student) => student.id !== id);
    setStudents(updatedList);
  };

  // Filter students based on search input
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="title">🎓 Student Database System</h2>

      {/* Add Student */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter student name"
          value={newStudent}
          onChange={(e) => setNewStudent(e.target.value)}
          className="input"
          ref={inputRef}
        />
        <button type="submit" className="add-btn" onClick={() => inputRef.current.focus()}>
          ➕ Add
        </button>
      </form>

      {/* Search Student */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search student"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      {/* List Students */}
      {filteredStudents.length ? (
        <ul className="list">
          {filteredStudents.map((student) => (
            <li key={student.id} className="list-item">
              <span className="student-name">
                {student.id}. {student.name}
              </span>
              <button
                onClick={() => handleDelete(student.id)}
                className="delete-btn"
              >
                ❌ Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-msg">No matching students found.</p>
      )}
    </div>
  );
};

export default StudentDB;
