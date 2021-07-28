package com.innovest.solution.repository;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.innovest.solution.model.Solution;


@Repository
public interface SolutionRepository extends MongoRepository<Solution, UUID> {

}
