package com.example.myproject.repo;

import com.example.myproject.entity.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
    // Additional custom queries (if needed) can be defined here
}
