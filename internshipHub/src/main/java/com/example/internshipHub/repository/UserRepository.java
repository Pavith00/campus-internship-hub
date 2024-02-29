package com.example.internshipHub.repository;


import com.example.internshipHub.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
    /*
    List<Student> findByLnameAndFname(String , String );//entityname,primarykeydatatype
     */
//    String deleteByID(studentId);
//    String deleteByfname(studentId);



        User findByUsername(String username);

        boolean existsByUsername(String username);

        String deleteByUsername(String username);

}
