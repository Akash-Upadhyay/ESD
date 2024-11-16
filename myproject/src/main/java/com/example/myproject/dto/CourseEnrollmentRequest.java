package com.example.myproject.dto;

import java.util.List;

public class CourseEnrollmentRequest {
    private String rollno;
    private List<String> selectedCourses;

    // Getters and Setters

    public String getRollno() {
        return rollno;
    }

    public void setRollno(String rollno) {
        this.rollno = rollno;
    }

    public List<String> getSelectedCourses() {
        return selectedCourses;
    }

    public void setSelectedCourses(List<String> selectedCourses) {
        this.selectedCourses = selectedCourses;
    }
}
