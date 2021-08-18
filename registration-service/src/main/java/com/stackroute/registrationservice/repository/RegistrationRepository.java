package com.stackroute.registrationservice.repository;

import com.stackroute.registrationservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface RegistrationRepository extends MongoRepository<User,UUID> {

    public List<User> findByEmail(String email);
    User findByUserId(UUID userId);
}
