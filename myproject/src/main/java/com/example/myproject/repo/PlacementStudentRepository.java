package com.example.myproject.repo;

import com.example.myproject.entity.PlacementStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacementStudentRepository extends JpaRepository<PlacementStudent, Long> {
    // Custom query methods (if needed) can be added here
}
