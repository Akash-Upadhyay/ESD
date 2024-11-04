package com.prashantjain.esdtestingprogram.service;

import com.prashantjain.esdtestingprogram.dto.CustomerRequest;
import com.prashantjain.esdtestingprogram.dto.CustomerResponse;
import com.prashantjain.esdtestingprogram.dto.LoginRequest;
import com.prashantjain.esdtestingprogram.entity.Customer;
import com.prashantjain.esdtestingprogram.exception.CustomerNotFoundException;
import com.prashantjain.esdtestingprogram.helper.EncryptionService;
import com.prashantjain.esdtestingprogram.helper.JWTHelper;
import com.prashantjain.esdtestingprogram.mapper.CustomerMapper;
import com.prashantjain.esdtestingprogram.repo.CustomerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepo customerRepo;
    private final CustomerMapper customerMapper;
    private final EncryptionService encryptionService;
    private final JWTHelper jwtHelper;
    public String createCustomer(CustomerRequest request) {
        Customer customer = customerMapper.toCustomer(request);
        customer.setPassword(encryptionService.encode(customer.getPassword()));
        customerRepo.save(customer);
        return "Customer Created Successfully";
    }

    public Customer getCustomer(String email) {
        return customerRepo.findByEmail(email)
                .orElseThrow(() -> new CustomerNotFoundException(
                        format("Cannot update Customer:: No customer found with the provided ID:: %s", email)
                ));
    }

    public CustomerResponse retrieveCustomer(String email) {
        Customer customer = getCustomer(email);
        return customerMapper.toCustomerResponse(customer);
    }

    public String login(LoginRequest request) {
        Customer customer = getCustomer(request.email());
        if(!encryptionService.validates(request.password(), customer.getPassword())) {
            return "Wrong Password or Email";
        }

        return jwtHelper.generateToken(request.email());
    }
}
