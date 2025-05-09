package com.example.StudentSystem.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.StudentSystem.Service.StudentService;
import com.example.StudentSystem.model.Student;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/student")
public class StudentController {
	@Autowired 
	private StudentService studentService;
	@PostMapping("/add")
	public String add(@RequestBody Student student)
	{
		studentService.saveStudent(student);
		return "New student added";
	}
	@GetMapping("/getAll")
	public List<Student>getAllstudents()
	{
	return studentService.getAllstudents();	
	}
	

	
}
