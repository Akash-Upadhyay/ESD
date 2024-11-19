package com.prashantjain.yummyrest.service;

import com.prashantjain.yummyrest.entity.Product;
import com.prashantjain.yummyrest.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product); // This will insert the product into the database
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id); // Returns Optional<Product>
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        if (productRepository.existsById(id)) {
            updatedProduct.setId(id); // Ensure the ID remains the same for the existing product
            return productRepository.save(updatedProduct); // Save updated product
        } else {
            throw new RuntimeException("Product not found with id " + id);
        }
    }

    public void deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id); // Delete the product by its ID
        } else {
            throw new RuntimeException("Product not found with id " + id);
        }
    }

    // Method to get top 2 products in the price range of 150 to 300
    public List<Product> getTopProductsInPriceRange() {
        return productRepository.findTop2ByPriceRange();
    }
}

