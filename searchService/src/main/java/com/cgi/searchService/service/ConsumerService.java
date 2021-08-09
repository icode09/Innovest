package com.cgi.searchService.service;

import com.cgi.searchService.document.ChallengeDoc;
import com.cgi.searchService.repositories.ChallengesRepository;
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

    private ChallengesRepository challengesRepository;

    @Autowired
    public ConsumerService(ChallengesRepository challengesRepository) {
        this.challengesRepository = challengesRepository;
    }

    /*This method will save the Registered users  to MYSQL-DB*/
    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(ChallengeDoc challengeDoc) {

        logger.info("User received is$$$$$$$$$$$$: " + challengeDoc.getChallengeName());
        challengesRepository.save(challengeDoc);
    }

    @Override
    public void configureRabbitListeners(RabbitListenerEndpointRegistrar rabbitListenerEndpointRegistrar) {

    }
}