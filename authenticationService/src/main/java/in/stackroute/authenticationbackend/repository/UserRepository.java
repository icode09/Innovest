package in.stackroute.authenticationbackend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import in.stackroute.authenticationbackend.model.User;


public interface UserRepository extends CrudRepository<User, String>{

	@Query("select u from User u where u.username = (?1) and u.password = (?2)")
	User validate(String username,String password);
	
//	User findByUsernameAndPassword(String userId, String userPassword);
	
}
