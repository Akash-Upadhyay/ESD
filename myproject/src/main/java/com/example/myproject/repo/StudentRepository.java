package com.example.myproject.repo;


import com.example.myproject.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // Method to find student by roll number
    Optional<Student> findByRollNo(String rollNo);

}

