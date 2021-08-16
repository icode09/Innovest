package com.stackroute.registrationservice.controller;

import com.stackroute.registrationservice.exception.UserAlreadyExist;
import com.stackroute.registrationservice.model.User;
import com.stackroute.registrationservice.service.RabbitMQSender;
import com.stackroute.registrationservice.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/v1/register")
public class RegistrationController {
    RegistrationService registrationService;
    RabbitMQSender rabbitMQSender;
    @Autowired
    public RegistrationController(RegistrationService registrationService, RabbitMQSender rabbitMQSender){
        this.registrationService=registrationService;
        this.rabbitMQSender=rabbitMQSender;
    }
    @PostMapping("/registered")
    public ResponseEntity<?> saveUser(@RequestBody User user) throws UserAlreadyExist {
        ResponseEntity<?> responseEntity;
        try {
            User userobj=null;
            UUID uuid = UUID.randomUUID();
            user.setUserId(uuid);
            System.out.println("User register with email:"+user.getEmail());
            userobj=registrationService.saveUser(user);
            rabbitMQSender.send(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch(Exception exc) {
            return new ResponseEntity<>(exc.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/data")
    public ResponseEntity<?> getData(){
        return new ResponseEntity<>("this is the data", HttpStatus.OK);
    }


    @GetMapping("/email")
    public ResponseEntity<?> getUserDetails(@RequestParam String emailId){
        User user = registrationService.getUser(emailId);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUserDetails(@RequestBody User user){
        System.out.println("user details:"+user.getEmail());
        User updatedUser = registrationService.updateUser(user);
        return new ResponseEntity<>(updatedUser,HttpStatus.CREATED);
    }
}
