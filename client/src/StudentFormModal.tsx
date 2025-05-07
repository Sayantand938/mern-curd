// src/StudentFormModal.tsx
import React, { useState, useEffect } from 'react';
import { type Student } from './App'; // Corrected: type-only import for Student
import './StudentFormModal.css';

// Define a type for the form data within the modal
export interface StudentFormData {
  name: string;
  dob: string;
  phoneno: string;
  email: string;
  subject: string;
  cgpa: string;
}

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData, id?: string) => void;
  initialData?: Student | null;
  mode: 'add' | 'edit';
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    dob: '',
    phoneno: '',
    email: '',
    subject: '',
    cgpa: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === 'edit') {
        setFormData({
          name: initialData.name,
          dob: initialData.dob,
          phoneno: initialData.phoneno,
          email: initialData.email,
          subject: initialData.subject,
          cgpa: initialData.cgpa.toString(),
        });
      } else {
        setFormData({
          name: '',
          dob: '',
          phoneno: '',
          email: '',
          subject: '',
          cgpa: '',
        });
      }
    }
  }, [isOpen, initialData, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.phoneno || !formData.email || !formData.subject || !formData.cgpa) {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit(formData, mode === 'edit' ? initialData?._id : undefined);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
          <i className="fas fa-times"></i>
        </button>
        <h2>{mode === 'add' ? 'Add New Student' : 'Edit Student Details'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="modalStudentName">Name</label>
            <input id="modalStudentName" type="text" name="name" placeholder="e.g., Grace Hopper" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="modalStudentDob">Date of Birth</label>
            <input id="modalStudentDob" type="text" name="dob" placeholder="YYYY-MM-DD" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="modalStudentPhoneno">Phone Number</label>
            <input id="modalStudentPhoneno" type="text" name="phoneno" placeholder="e.g., 123-456-7890" value={formData.phoneno} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="modalStudentEmail">Email</label>
            <input id="modalStudentEmail" type="email" name="email" placeholder="e.g., grace@example.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="modalStudentSubject">Subject</label>
            <input id="modalStudentSubject" type="text" name="subject" placeholder="e.g., CSE" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="modalStudentCgpa">CGPA</label>
            <input id="modalStudentCgpa" type="number" name="cgpa" step="0.01" placeholder="e.g., 7.0" value={formData.cgpa} onChange={handleChange} required />
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-submit-button">
              {mode === 'add' ? 'Add Student' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;


