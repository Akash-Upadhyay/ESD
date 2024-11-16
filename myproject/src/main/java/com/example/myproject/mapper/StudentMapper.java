package com.example.myproject.mapper;

import com.example.myproject.dto.StudentDTO;
import com.example.myproject.entity.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    // Convert Student entity to DTO
    public StudentDTO toDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setRollNo(student.getRollNo());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setPathForPhoto(student.getPathForPhoto());
        dto.setCgpa(student.getCgpa());
        dto.setTotalCredits(student.getTotalCredits());
        dto.setGraduationYear(student.getGraduationYear());
        return dto;
    }

    // Convert DTO to Student entity
    public Student toEntity(StudentDTO dto) {
        Student student = new Student();
        student.setId(dto.getId());
        student.setRollNo(dto.getRollNo());
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setPathForPhoto(dto.getPathForPhoto());
        student.setCgpa(dto.getCgpa());
        student.setTotalCredits(dto.getTotalCredits());
        student.setGraduationYear(dto.getGraduationYear());
        return student;
    }
}
