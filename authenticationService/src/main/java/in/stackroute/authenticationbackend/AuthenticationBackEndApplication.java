package in.stackroute.authenticationbackend;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import in.stackroute.authenticationbackend.config.JwtFilter;

@SpringBootApplication
@EnableRabbit
public class AuthenticationBackEndApplication {

	/*
	 * Filter Registration Bean
	 * setFilter() - to set new instance of JwtFilter object.
	 * Also specifies the Url patterns for registration bean. 
	 */
	
	@Bean
	public FilterRegistrationBean jwtFilter() {

		final FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		registrationBean.setFilter(new JwtFilter());
		registrationBean.addUrlPatterns("/api/*");
		return registrationBean;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(AuthenticationBackEndApplication.class, args);
	}
}
