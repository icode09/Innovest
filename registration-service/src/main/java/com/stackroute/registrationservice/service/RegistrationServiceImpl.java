package com.stackroute.registrationservice.service;

import com.stackroute.registrationservice.exception.UserAlreadyExist;
import com.stackroute.registrationservice.model.User;
import com.stackroute.registrationservice.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationServiceImpl implements RegistrationService{
    RegistrationRepository registrationRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

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
        User toUpdate = registrationRepository.findByUserId(user.getUserId());

        System.out.println(toUpdate);
        toUpdate.setDomain(user.getDomain());
        toUpdate.setDisplayName(user.getDisplayName());
        toUpdate.setPassword(user.getPassword());
        toUpdate.setBio(user.getBio());

        return registrationRepository.save(toUpdate);
   }

}
