package com.innovest.solution.service;

import java.util.List;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.innovest.solution.model.Solution;
import com.innovest.solution.model.SolutionStatus;
import com.innovest.solution.repository.SolutionRepository;


@Service
public class SolutionServiceImpl implements SolutionService {

	SolutionRepository repo;
	
	@Autowired
	public SolutionServiceImpl(SolutionRepository repo) {
		super();
		this.repo=repo;
	}
	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public Solution addSolution(Solution solution) {
		return repo.save(solution);
	}

	@Override
	public Solution updateSolution(Solution solution) {
		Solution toUpdate = repo.findBySolutionId(solution.getSolutionId());

		System.out.println(toUpdate);
		toUpdate.setCodeUrl(solution.getCodeUrl());
		toUpdate.setDocumentUrl(solution.getDocumentUrl());
		toUpdate.setSolutionDescription(solution.getSolutionDescription());
		toUpdate.setSolutionTitle(solution.getSolutionTitle());
		toUpdate.setSolutionStatus(solution.getSolutionStatus());
		return repo.save(toUpdate);
	}

	@Override
	public Solution updateSolutionStatus(UUID solutionId, SolutionStatus solutionStatus) {
		Query query=new Query();
		Update update= new Update().set("solutionStatus", solutionStatus);
		query.addCriteria(Criteria.where("solutionId").is(solutionId));

		Solution solution = mongoTemplate.findAndModify(query,update,Solution.class);
		return solution;
	}

	@Override
	public Solution updateReviewComments(UUID solutionId, String[] reviewComments) {
		Query query=new Query();
		Update update= new Update().set("reviewComments", reviewComments);
		query.addCriteria(Criteria.where("solutionId").is(solutionId));

		Solution solution = mongoTemplate.findAndModify(query,update,Solution.class);
		return solution;
	}

	@Override
	public List<Solution> getAllSolutions() {
		System.out.println(repo.findAll());
		return (List<Solution>) repo.findAll();
	}


	@Override
	public List<Solution> getSolutionsBySolutionStatus(SolutionStatus solutionStatus) {
		// TODO Auto-generated method stub
		Query query=new Query();
		query.addCriteria(Criteria.where("solutionStatus").is(solutionStatus));
		List<Solution> solutions=mongoTemplate.find(query,Solution.class);
		return solutions;
	}

	@Override
	public List<Solution> getSolutionsByChallenge(UUID challengeId) {
		// TODO Auto-generated method stub
		Query query=new Query();
		query.addCriteria(Criteria.where("challengeId").is(challengeId));
		List<Solution> solutions=mongoTemplate.find(query,Solution.class);
		return solutions;
	}

	@Override
	public List<Solution> getSolutionsByUser(String solvedBy) {
		// TODO Auto-generated method stub
		Query query=new Query();
		query.addCriteria(Criteria.where("solvedBy").is(solvedBy));
		List<Solution> solutions=mongoTemplate.find(query,Solution.class);
		return solutions;
	}

	@Override
	public void removeSolution(UUID solutionId) {
		// TODO Auto-generated method stub
		repo.deleteById(solutionId);
	}
	
}
