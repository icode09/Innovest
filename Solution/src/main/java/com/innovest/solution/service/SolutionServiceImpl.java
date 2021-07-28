package com.innovest.solution.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

	@Override
	public Solution addSolution(Solution solution) {
		return repo.save(solution);
	}

	@Override
	public Solution updateSolution(Solution solution) {
		Solution toUpdate = repo.findById(solution.getSolutionId()).get(); 
		toUpdate.setCodeUrl(solution.getCodeUrl());
		toUpdate.setDocumentUrl(solution.getDocumentUrl());
		toUpdate.setSolutionDescription(solution.getSolutionDescription());
		toUpdate.setSolutionTitle(solution.getSolutionTitle());
		toUpdate.setSolutionStatus(solution.getSolutionStatus());
		return repo.save(toUpdate);
	}

	@Override
	public List<Solution> getAllSolutions() {
		System.out.println(repo.findAll());
		return (List<Solution>) repo.findAll();
	}


	@Override
	public List<Solution> getSolutionsBySolutionStatus(SolutionStatus solutionStatus) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Solution> getSolutionsByChallenge(UUID challengeId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Solution> getSolutionsByUser(UUID solvedBy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeSolution(UUID solutionId) {
		// TODO Auto-generated method stub
		repo.deleteById(solutionId);
	}
	
}
