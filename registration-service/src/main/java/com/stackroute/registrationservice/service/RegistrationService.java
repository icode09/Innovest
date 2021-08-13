package com.stackroute.registrationservice.service;

import com.stackroute.registrationservice.exception.UserAlreadyExist;
import com.stackroute.registrationservice.model.User;

import java.util.List;

public interface RegistrationService {
    public User saveUser(User user) throws UserAlreadyExist;
    public User getUser(String emailId);
    public User updateUser(User user);
}
