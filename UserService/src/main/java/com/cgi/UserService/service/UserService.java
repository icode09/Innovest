package com.cgi.UserService.service;

import com.cgi.UserService.dto.SignUpRequest;
import com.cgi.UserService.exception.UserAlreadyExistAuthenticationException;
import com.cgi.UserService.model.User;

public interface UserService {
    User registerNewUser(SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException;

    User findUserByEmail(String email);
}
