package com.example.myproject.entity;

import jakarta.persistence.*;

@Entity
public class StudentCourses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "roll_no") // referencing rollno from student table
    private Student student;  // Assuming the student entity exists

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "course_code") // referencing course_id from course table
    private Course course;  // Assuming the course entity exists

    private String gradeId;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public String getGradeId() {
        return gradeId;
    }

    public void setGradeId(String gradeId) {
        this.gradeId = gradeId;
    }
}
