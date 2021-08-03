package com.stackroute.registrationservice.exception;

public class UserAlreadyExist extends Exception {

    private String message;

    public UserAlreadyExist(String message) {
        super(message);
        this.message = message;
    }

    public UserAlreadyExist() {}
}
