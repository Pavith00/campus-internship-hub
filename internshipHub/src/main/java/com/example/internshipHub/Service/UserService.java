//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.internshipHub.Service;

import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.User;
import com.example.internshipHub.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService() {
    }

    public List<User> getAllUsers() {
        try {
            return this.repository.findAll();
        } catch (Exception var2) {
            throw new ServiceException("Error occurred while fetching users", var2);
        }
    }

    public User getUser(String username) {
        try {
            return this.repository.findByUsername(username);
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while fetching specific user", var3);
        }
    }

    public String addUser(User user) {
        try {
            if (!repository.existsByUsername(user.getUsername().trim())) {
                // Remove leading and trailing whitespaces from the username
                user.setUsername(user.getUsername().trim());
                // Hash the password
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                // Save the user
                repository.save(user);
                return "User " + user.getUsername() + " Saved Successfully";
            } else {
                return "Username " + user.getUsername() + " Already Exists";
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while adding a user", e);
        }
    }


    public String updateUser(User userRequest) {
        try {
            if (this.repository.existsByUsername(userRequest.getUsername())) {
                User existingUser = this.repository.findByUsername(userRequest.getUsername());
                if (userRequest.getEmail() != null) {
                    existingUser.setEmail(userRequest.getEmail());
                }

                if (userRequest.getPassword() != null) {
                    existingUser.setPassword(userRequest.getPassword());
                }

                if (userRequest.getPhone() != null) {
                    existingUser.setPhone(userRequest.getPhone());
                }

                if (userRequest.getName() != null) {
                    existingUser.setName(userRequest.getName());
                }

                return "User " + userRequest.getUsername() + " Updated successfully";
            } else {
                return "User " + userRequest.getUsername() + " Does not Exist";
            }
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while updating a user", var3);
        }
    }

    public boolean login(String username, String password) {
        // Retrieve the user from the database based on the provided username
        User user = repository.findByUsername(username);

        // Check if the user exists and if the password matches
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            // Return true if the credentials are valid
            return true;
        } else {
            // Return false if the credentials are invalid
            return false;
        }
    }


    public String deleteUser(String username) {
        try {
            if (this.repository.existsByUsername(username)) {
                this.repository.deleteByUsername(username);
                return username + " User Deleted Successfully";
            } else {
                return username + " User Does not exists";
            }
        } catch (Exception var3) {
            throw new ServiceException("Error Occurred while Deleting User", var3);
        }
    }
}
