package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.UserService;
import com.example.internshipHub.model.LoginDTO;
import com.example.internshipHub.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable String username){
        return service.getUser(username);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String addUser(@RequestBody User user){
        return service.addUser(user);
    }

    @PostMapping("/login")
    public boolean login(@RequestBody LoginDTO loginDTO){
        return service.login(loginDTO.getUsername(), loginDTO.getPassword());
    }

    @PutMapping
    public String updateUser(@RequestBody User user){
        return service.updateUser(user);
    }

    @DeleteMapping("/{username}")
    public String deleteUser(@PathVariable String username){
        return service.deleteUser(username);
    }
}