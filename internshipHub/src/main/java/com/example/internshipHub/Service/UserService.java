package com.example.internshipHub.Service;

import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.Student;
import com.example.internshipHub.model.User;
import com.example.internshipHub.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers(){
        try {
            return repository.findAll();
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching users", e);
        }
    }

    public User getUser(String username){
        try{
            return repository.findByUsername(username);
        } catch (Exception e){
            throw new ServiceException("Error occurred while fetching specific user", e);
        }
    }

    public  String addUser(User user){
        try {
            if(!repository.existsByUsername(user.getUsername().trim())) {
                // Remove leading and trailing whitespaces from the username
                user.setUsername(user.getUsername().trim());
                // Save the student without modifying the password
                repository.save(user);
                return "User " + user.getUsername() + " Saved Successfully";
            }
            else {
                return "Username " + user.getUsername() + " Already Exists";
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while adding a user", e);
        }
    }

    //TODO: Not Updating
    //TODO: Remove Password updaing in update profile and introduce another
    public String updateUser(User userRequest){
        try {
            if (repository.existsByUsername(userRequest.getUsername())) {
                User existingUser = repository.findByUsername(userRequest.getUsername());
                if(userRequest.getEmail() != null) {
                    existingUser.setEmail(userRequest.getEmail());
                }
                if(userRequest.getPassword() != null) {
                    existingUser.setPassword(userRequest.getPassword());
                }
                if(userRequest.getPhone() != null) {
                    existingUser.setPhone(userRequest.getPhone());
                }
                if(userRequest.getName() != null) {
                    existingUser.setName(userRequest.getName());
                }
                return "User " + userRequest.getUsername() + " Updated successfully";
            } else {
                return "User " + userRequest.getUsername() + " Does not Exist";
            }
        } catch (Exception e){
            throw new ServiceException("Error occurred while updating a user", e);
        }
    }

    public boolean login(String username, String password) {
        // Retrieve the student from the database based on the provided username
        User user = repository.findByUsername(username);

        // Check if the student exists and if the password matches
        if (user != null && user.getPassword().equals(password)) {
            // Return true if the credentials are valid
            return true;
        } else {
            // Return false if the credentials are invalid
            return false;
        }
    }

    public String deleteUser(String username){
        try {
            if(repository.existsByUsername(username)) {
                repository.deleteByUsername(username);
                return username + " User Deleted Successfully";
            }
            else{
                return username + " User Does not exists";
            }
        } catch (Exception e){
            throw new ServiceException("Error Occurred while Deleting User", e);
        }
    }

}
