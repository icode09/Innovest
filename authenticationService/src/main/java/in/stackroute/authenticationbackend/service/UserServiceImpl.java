package in.stackroute.authenticationbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.stackroute.authenticationbackend.model.User;
import in.stackroute.authenticationbackend.repository.UserRepository;

@Service("UserService")
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;

	public boolean validate(String email, String password) {
		email=email.trim();

		if (userRepository.validate(email, password) != null) {
			return true;
		} else {
			return false; }
	}

}
