package com.example.StudentSystem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.StudentSystem.model.Student;
import com.example.StudentSystem.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {
@Autowired
private StudentRepository studentRepository;
@Override 
public Student saveStudent(Student student)
{
	return studentRepository.save(student);
			
}

@Override
public List<Student> getAllstudents() {
	// TODO Auto-generated method stub
	return null;
}
}
