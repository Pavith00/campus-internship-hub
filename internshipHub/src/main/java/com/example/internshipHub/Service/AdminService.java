package com.example.internshipHub.Service;

import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.Admin;
import com.example.internshipHub.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAllAdmins() {
        try {
            return adminRepository.findAll();
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching admins", e);
        }
    }

    public Admin getAdminByUsername(String username) {
        try {
            return adminRepository.findByUsername(username);
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching admin by username", e);
        }
    }

    public String addAdmin(Admin admin) {
        try {
            if (!adminRepository.existsByUsername(admin.getUsername())) {
                adminRepository.save(admin);
                return "Admin " + admin.getUsername() + " saved successfully";
            } else {
                return "Username " + admin.getUsername() + " already exists";
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while adding an admin", e);
        }
    }

    public String updateAdmin(String id, Admin updatedAdmin) {
        try {
            if (adminRepository.existsById(id)) {
                updatedAdmin.setId(id);
                adminRepository.save(updatedAdmin);
                return "Admin updated successfully";
            } else {
                throw new ServiceException("Admin not found with id: " + id);
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while updating an admin", e);
        }
    }

    public String deleteAdmin(String username) {
        try {
            if (adminRepository.existsByUsername(username)) {
                adminRepository.deleteByUsername(username);
                return "Admin " + username + " deleted successfully";
            } else {
                throw new ServiceException("Admin not found with username: " + username);
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while deleting an admin", e);
        }
    }
}
