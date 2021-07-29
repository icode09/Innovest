package com.cgi.UserService.repository;

import com.cgi.UserService.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
}
