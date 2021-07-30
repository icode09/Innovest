package com.stackroute.registrationservice.controller;

import com.stackroute.registrationservice.exception.UserAlreadyExist;
import com.stackroute.registrationservice.model.User;
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
    @Autowired
    public RegistrationController(RegistrationService registrationService){
        this.registrationService=registrationService;
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
            responseEntity= new ResponseEntity<>("User saved successfully", HttpStatus.CREATED);
        } catch(Exception exc) {
            responseEntity = new ResponseEntity<>(exc.getMessage(), HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    @GetMapping("/data")
    public ResponseEntity<?> getData(){
        return new ResponseEntity<>("this is the data", HttpStatus.OK);
    }

}
