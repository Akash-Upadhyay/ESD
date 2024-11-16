package com.example.myproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

//    @Column(nullable = false, unique = true)
    @Column(name = "course_code", unique = true,nullable = false)
    private String courseCode;

    private String name;

    @Column(length = 1000)
    private String description;

    private Integer year; // Academic year the course belongs to

    private String term; // e.g., Spring, Fall, Summer, etc.

    private String faculty; // Faculty assigned to the course

    private Integer credit; // Credit hours for the course

    private Integer capacity; // Maximum number of students allowed

    // Getters and Setters
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}
