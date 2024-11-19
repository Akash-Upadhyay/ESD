package com.prashantjain.yummyrest.repo;



import com.prashantjain.yummyrest.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Custom query methods can be added here if needed

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN 150 AND 300 ORDER BY p.price DESC LIMIT 2")
    List<Product> findTop2ByPriceRange();
}
