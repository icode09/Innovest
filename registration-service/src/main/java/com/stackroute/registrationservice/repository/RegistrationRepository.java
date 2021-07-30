package com.stackroute.registrationservice.repository;

import com.stackroute.registrationservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RegistrationRepository extends MongoRepository<User,Integer> {

    public List<User> findByEmail(String email);

}
