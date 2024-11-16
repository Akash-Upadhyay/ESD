package com.example.myproject.entity;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(nullable = false, unique = true)
    @Column(name = "roll_no", unique = true,nullable = false)
    private String rollNo;

    private String firstName;
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    private String pathForPhoto; // Path to the photo file

    private Double cgpa; // Current CGPA of the student

    private Integer totalCredits; // Total credits earned by the student

    private Integer graduationYear; // Expected graduation year

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPathForPhoto() {
        return pathForPhoto;
    }

    public void setPathForPhoto(String pathForPhoto) {
        this.pathForPhoto = pathForPhoto;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public Integer getTotalCredits() {
        return totalCredits;
    }

    public void setTotalCredits(Integer totalCredits) {
        this.totalCredits = totalCredits;
    }

    public Integer getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(Integer graduationYear) {
        this.graduationYear = graduationYear;
    }
}
