package in.stackroute.authenticationbackend.service;

import java.util.List;

import in.stackroute.authenticationbackend.model.User;

public interface UserService {

	
	public boolean validate(String email, String password);

}
