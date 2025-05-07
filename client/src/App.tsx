import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import './App.css';
import StudentFormModal, { type StudentFormData } from './StudentFormModal'; // Corrected: type-only import for StudentFormData

// Keep the Student interface here or move it to a shared types.ts file
export interface Student {
  _id: string;
  name: string;
  dob: string;
  phoneno: string;
  email: string;
  subject: string;
  cgpa: number;
}

const API_URL = 'http://localhost:5000/students'; // Defined outside component

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentStudentForEdit, setCurrentStudentForEdit] = useState<Student | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      // Consider adding user-facing error message here if needed
    }
  }, []); // API_URL is a top-level const, setStudents is stable

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleOpenModal = useCallback((mode: 'add' | 'edit', student: Student | null = null) => {
    setModalMode(mode);
    setCurrentStudentForEdit(student);
    setIsModalOpen(true);
  }, []); // State setters from useState are stable and don't need to be in deps array

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentStudentForEdit(null); // Reset current student on close
  }, []); // State setters from useState are stable

  const handleFormSubmit = useCallback(async (formData: StudentFormData, id?: string) => {
    // Assuming StudentFormData has cgpa as string, hence parseFloat
    const studentPayload = {
      name: formData.name,
      dob: formData.dob,
      phoneno: formData.phoneno,
      email: formData.email,
      subject: formData.subject,
      cgpa: parseFloat(formData.cgpa),
    };

    try {
      if (modalMode === 'add') {
        await axios.post(API_URL, studentPayload);
      } else if (modalMode === 'edit' && id) {
        await axios.put(`${API_URL}/${id}`, studentPayload);
      }
      fetchStudents(); // Re-fetch students to reflect changes
      handleCloseModal();
    } catch (error) {
      console.error(`Error ${modalMode === 'add' ? 'adding' : 'updating'} student:`, error);
      alert(`Failed to ${modalMode === 'add' ? 'add' : 'update'} student. Check console for details.`);
    }
  }, [modalMode, fetchStudents, handleCloseModal]); // API_URL is const

  const deleteStudent = useCallback(async (id: string) => {
    // Added confirmation dialog for better UX
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        // Update state optimistically using functional update for setStudents
        setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student. Check console for details.'); // User feedback for error
      }
    }
  }, []); // API_URL is const, setStudents (with functional update) doesn't require `students` as dep

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) { // If search term is empty or whitespace, return all students
      return students;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return students.filter(student =>
      student.name.toLowerCase().includes(lowerSearchTerm) ||
      student.email.toLowerCase().includes(lowerSearchTerm) ||
      student.subject.toLowerCase().includes(lowerSearchTerm)
    );
  }, [students, searchTerm]);

  return (
    <div className="App">
      <h1>Student Management</h1>

      <div className="controls-header">
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-new-button" onClick={() => handleOpenModal('add')}>
          <i className="fas fa-plus"></i> Add New
        </button>
      </div>

      <div className="student-list">
        {filteredStudents.length === 0 ? (
          <p className="no-students-message">
            {students.length > 0 && searchTerm ? 'No students match your search criteria.' : 'No students found. Click "Add New" to get started!'}
          </p>
        ) : (
        <table>
          <thead>
            <tr>
              <th className="col-name">Name</th>
              <th className="col-dob">DOB</th>
              <th className="col-phone">Phone No</th>
              <th className="col-email">Email</th>
              <th className="col-subject">Subject</th>
              <th className="col-cgpa">CGPA</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.dob}</td>
                <td>{student.phoneno}</td>
                <td>{student.email}</td>
                <td>{student.subject}</td>
                <td>{student.cgpa.toFixed(2)}</td>
                <td className="col-actions">
                  <button
                    className="edit-button icon-button"
                    onClick={() => handleOpenModal('edit', student)}
                    aria-label={`Edit ${student.name}`}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="delete-button icon-button"
                    onClick={() => deleteStudent(student._id)}
                    aria-label={`Delete ${student.name}`}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      <StudentFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={currentStudentForEdit}
        mode={modalMode}
      />
    </div>
  );
}

export default App;


