package com.example.myproject.repo;




import com.example.myproject.entity.Domain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DomainRepository extends JpaRepository<Domain, Long> {
    // Additional custom queries (if needed) can be added here
}
