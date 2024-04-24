package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.CompanyService;
import com.example.internshipHub.Service.JobService;
import com.example.internshipHub.model.CV;
import com.example.internshipHub.model.Company;
import com.example.internshipHub.model.Job;
import com.example.internshipHub.model.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/{username}")
    public Company getCompanyByUsername(@PathVariable String username) {
        return companyService.getCompany(username);
    }



    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public String addCompany(@RequestBody Company company) {
        return companyService.addCompany(company);
    }

    @PostMapping("/login")
    public boolean login(@RequestBody LoginDTO loginDTO) {
        return companyService.login(loginDTO.getUsername(), loginDTO.getPassword());
    }

    @PutMapping("/{username}")
    public String updateCompany(@PathVariable String username, @RequestBody Company company) {
        return companyService.updateCompany(username, company);
    }

    @DeleteMapping("/{username}")
    public String deleteCompany(@PathVariable String username) {
        return companyService.deleteCompany(username);
    }
}

