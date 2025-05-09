package com.example.StudentSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.StudentSystem.model.Student;

public interface StudentRepository extends JpaRepository<Student,Integer>
{

}
