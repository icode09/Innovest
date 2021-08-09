package in.stackroute.authenticationbackend.service;

import in.stackroute.authenticationbackend.model.User;
import in.stackroute.authenticationbackend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsumerService implements RabbitListenerConfigurer {

    private static Logger logger = LoggerFactory.getLogger(ConsumerService.class);

    private UserRepository userRepository;

    @Autowired
    public ConsumerService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*This method will save the Registered users  to MYSQL-DB*/
    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(User user) {

        logger.info("User received is$$$$$$$$$$$$: " + user.getEmail()+" password"+user.getPassword());
        userRepository.save(user);
    }

    @Override
    public void configureRabbitListeners(RabbitListenerEndpointRegistrar rabbitListenerEndpointRegistrar) {

    }
}
