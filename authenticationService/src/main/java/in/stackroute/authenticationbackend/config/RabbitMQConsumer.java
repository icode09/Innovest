package in.stackroute.authenticationbackend.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConsumer {

    @Value("${spring.rabbitmq.queue}")
    private String queue;

    @Value("${spring.rabbitmq.exchange}")
    private String exchange;

    @Value("${spring.rabbitmq.username}")
    private String username;

    @Value("${spring.rabbitmq.password}")
    private String password;

    @Value("${spring.rabbitmq.host}")
    private String host;

    @Value("${spring.rabbitmq.routingkey}")
    private String routingkey;

    /*A Bean with name Queue is created, where the information from the exchange and sent to consumer */
    @Bean
    Queue queue() {
        return new Queue(queue, true);
    }

    /*A Bean with name exchange is created which routes the info. to the respective Queue.*/
    @Bean
    Exchange exchange() {
        return ExchangeBuilder.directExchange(exchange).durable(true).build();
    }

    /*A Bean with name Binding is created , which acts a link between a queue and exchange*/
    @Bean
    Binding binding() {
        return BindingBuilder.bind(queue())
                .to(exchange())
                .with(routingkey)
                .noargs();
    }

    /*A Bean with name ConnectionFactory is created, that helps in setting up a connection to rabbitmq server
    and configure binding to send the messages */
    @Bean
    ConnectionFactory connectionFactory() {
        CachingConnectionFactory cachingConnectionFactory = new CachingConnectionFactory(host);
        cachingConnectionFactory.setUsername(username);
        cachingConnectionFactory.setPassword(password);
        return cachingConnectionFactory;
    }

    /*A Bean with name MessageConverter is created, which converts java objects to JSON Format.*/
    @Bean
    MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    /*A Bean with name RabbitTemplate is created, which accepts and forwards the messages*/
    @Bean
    RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }

}
