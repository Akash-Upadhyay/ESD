package com.example.myproject.entity;


import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "placement_students")
public class PlacementStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long placementId;

    private Long studentId;

    @Lob
    private byte[] cvApplication; // Storing CV as a binary large object (BLOB)

    @Column(length = 500)
    private String about; // About the student or application (optional)

    private Boolean acceptance; // Whether the application is accepted or not

    @Column(length = 1000)
    private String comment; // Comments on the application

    private LocalDate date; // Submission or review date

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlacementId() {
        return placementId;
    }

    public void setPlacementId(Long placementId) {
        this.placementId = placementId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public byte[] getCvApplication() {
        return cvApplication;
    }

    public void setCvApplication(byte[] cvApplication) {
        this.cvApplication = cvApplication;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public Boolean getAcceptance() {
        return acceptance;
    }

    public void setAcceptance(Boolean acceptance) {
        this.acceptance = acceptance;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
