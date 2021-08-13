package com.stackroute.registrationservice.service;

import com.stackroute.registrationservice.exception.UserAlreadyExist;
import com.stackroute.registrationservice.model.User;
import com.stackroute.registrationservice.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationServiceImpl implements RegistrationService{
    RegistrationRepository registrationRepository;


   @Autowired
   public RegistrationServiceImpl(RegistrationRepository registrationRepository){
       this.registrationRepository = registrationRepository;
   }

   @Override
    public User saveUser(User user) throws UserAlreadyExist {
       User savedUser = new User();
       List<User> existingUser = registrationRepository.findByEmail(user.getEmail());
       if (existingUser.size()>0) {
           throw new UserAlreadyExist("User with email:"+user.getEmail()+" already exists");
       } else {
           savedUser = registrationRepository.save(user);
       }
       return savedUser;
    }

    @Override
    public User getUser(String emailId) {
        return registrationRepository.findByEmail(emailId).get(0);
    }

    @Override
    public User updateUser(User user) {
        User user1 = registrationRepository.findByEmail(user.getEmail()).get(0);
        user1.setBio(user.getBio());
        user1.setDisplayName(user.getDisplayName());
        user1.setDomain(user.getDomain());
        user1.setPassword(user.getPassword());

        return user1;
    }

}
