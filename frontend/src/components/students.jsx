import React, { useState, useEffect } from "react";
import axios from "axios";
import "./students.css"
function Students() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentname: "",
    studentadress: "",
    mobile: "",
  });
  const [editingId, setEditingId] = useState(null);

  //  Récupérer tous les étudiants
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/student/getAll");
      setStudents(res.data);
    } catch (err) {
      console.error("Erreur GET:", err);
    }
  };

  //  Ajouter ou modifier un étudiant
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`http://localhost:8080/api/v1/student/edit/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Ajouter
        await axios.post("http://localhost:8080/api/v1/student/save", formData);
      }
      setFormData({ studentname: "", studentadress: "", mobile: "" });
      fetchStudents();
    } catch (err) {
      console.error("Erreur POST/PUT:", err);
    }
  };

  // Supprimer un étudiant
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/student/delete/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Erreur DELETE:", err);
    }
  };

  // Préparer la modification
  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      studentname: student.studentname,
      studentadress: student.studentadress,
      mobile: student.mobile,
    });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Gestion des étudiants</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nom"
          value={formData.studentname}
          onChange={(e) => setFormData({ ...formData, studentname: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Adresse"
          value={formData.studentadress}
          onChange={(e) => setFormData({ ...formData, studentadress: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
      </form>

      <table >
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentname}</td>
              <td>{student.studentadress}</td>
              <td>{student.mobile}</td>
              <td>
                <button  className='update_button' onClick={() => handleEdit(student)}>Update</button>{" "}
                <button  className='delete_button' onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;

