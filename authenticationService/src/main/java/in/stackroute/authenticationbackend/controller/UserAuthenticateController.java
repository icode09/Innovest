package in.stackroute.authenticationbackend.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import in.stackroute.authenticationbackend.model.User;
import in.stackroute.authenticationbackend.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@CrossOrigin
public class UserAuthenticateController {
	static final long EXPIRATIONTIME = 300000;
	Map<String, String> map = new HashMap<>();

	@Autowired
	private UserService userService;


	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody User user) throws ServletException {

		String jwtToken = "";

		try {
			jwtToken = getToken(user.getUsername(), user.getPassword());
			map.clear();
			map.put("username",user.getUsername()); 
			map.put("message", "user successfully logged in");
			map.put("token", jwtToken);
		} catch (Exception e) {
			String exceptionMessage = e.getMessage();
			map.clear();
			map.put("token", null);
			map.put("message", exceptionMessage);
			return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	public String getToken(String username, String password) throws Exception {

		if (username == null || password == null) {
			throw new ServletException("Please fill in username and password");
		}

		boolean flag = userService.validate(username, password);

		if (!flag) {
			throw new ServletException("Invalid credentials.");
		}
		

		String jwtToken = Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();

		
		
		return jwtToken;

	}

}










