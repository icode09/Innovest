package com.cgi.UserService.service;

import com.cgi.UserService.dto.SignUpRequest;
import com.cgi.UserService.exception.UserAlreadyExistAuthenticationException;
import com.cgi.UserService.model.User;
import com.cgi.UserService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    @Transactional(value = "transactionManager")
    public User registerNewUser(SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new UserAlreadyExistAuthenticationException("User with email id " + signUpRequest.getEmail() + " already exist");
        }
        User user = buildUser(signUpRequest);
        user = userRepository.save(user);
        return user;
    }

    private User buildUser(final SignUpRequest formDTO) {
        User user = new User();
        user.setDisplayName(formDTO.getDisplayName());
        user.setEmail(formDTO.getEmail());
        user.setPassword(passwordEncoder.encode(formDTO.getPassword()));
        return user;
    }
    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
