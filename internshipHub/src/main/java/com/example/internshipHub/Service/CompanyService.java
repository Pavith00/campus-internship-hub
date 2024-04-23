package com.example.internshipHub.Service;

import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.Company;
import com.example.internshipHub.model.LoginDTO;
import com.example.internshipHub.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Autowire the PasswordEncoder bean

    public List<Company> getAllCompanies() {
        try {
            return companyRepository.findAll();
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching companies", e);
        }
    }

    public Company getCompany(String username) {
        try {
            return companyRepository.findByUsername(username);
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching specific company", e);
        }
    }

    public String addCompany(Company company) {
        try {
            if (!companyRepository.existsByUsername(company.getUsername().trim())) {
                company.setUsername(company.getUsername().trim());
                // Hash the password before saving
                company.setPassword(passwordEncoder.encode(company.getPassword()));
                companyRepository.save(company);
                return "Company " + company.getUsername() + " Saved Successfully";
            } else {
                return "Username " + company.getUsername() + " Already Exists";
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while adding a company", e);
        }
    }

    public String updateCompany(String username, Company updatedCompany) {
        try {
            if (companyRepository.existsByUsername(username)) {
                updatedCompany.setUsername(username);
                companyRepository.save(updatedCompany);
                return "Company updated successfully";
            } else {
                throw new ServiceException("Company not found with username: " + username);
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while updating a company", e);
        }
    }

    public String deleteCompany(String username) {
        try {
            if (companyRepository.existsByUsername(username)) {
                companyRepository.deleteByUsername(username);
                return username + "Company deleted successfully";
            } else {
                throw new ServiceException("Company not found with username: " + username);
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while deleting company", e);
        }
    }

    public boolean login(String username, String password) {
        Company company = companyRepository.findByUsername(username);
        if (company != null && passwordEncoder.matches(password, company.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

    public Company getCompanyByName(String companyName) {
        return companyRepository.findByCompanyName(companyName);
    }
}
