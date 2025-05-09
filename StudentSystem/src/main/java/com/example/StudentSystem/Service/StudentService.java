package com.example.StudentSystem.Service;

import java.util.List;

import com.example.StudentSystem.model.Student;

public interface StudentService {
	public Student saveStudent(Student student);
	public List<Student> getAllstudents();
	
}
