package com.innovest.solution.service;

import java.util.List;
import java.util.UUID;

import com.innovest.solution.model.Solution;
import com.innovest.solution.model.SolutionStatus;

public interface SolutionService {
	Solution addSolution(Solution solution);
	Solution updateSolution(Solution solution);
	List<Solution> getAllSolutions();
	List<Solution> getSolutionsByChallenge(UUID challengeId);
	List<Solution> getSolutionsByUser(UUID solvedBy);
	List<Solution> getSolutionsBySolutionStatus(SolutionStatus solutionStatus);
	void removeSolution(UUID solutionId);
}
