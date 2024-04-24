package com.example.internshipHub.Controller;



import com.example.internshipHub.Service.AdminService;
import com.example.internshipHub.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/admin/login")
    public String loginAdmin(@RequestBody Admin admin) {
        boolean loginStatus = adminService.login(admin.getUsername(), admin.getPassword());
        if (loginStatus) {
            return "Login successful!";
        } else {
            return "Invalid username or password";
        }
    }
}
