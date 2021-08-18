package com.innovest.solution.service;

import java.util.List;
import java.util.UUID;

import com.innovest.solution.model.Solution;
import com.innovest.solution.model.SolutionStatus;
import org.springframework.web.multipart.MultipartFile;

public interface SolutionService {
	Solution addSolution(Solution solution);
	Solution updateSolution(Solution solution);
	Solution updateSolutionStatus(UUID solutionId, SolutionStatus solutionStatus);
	Solution updateReviewComments(UUID solutionId, String[] reviewComments);
	List<Solution> getAllSolutions();
	List<Solution> getSolutionsByChallenge(UUID challengeId);
	List<Solution> getSolutionsByUser(String solvedBy);
	List<Solution> getSolutionsBySolutionStatus(SolutionStatus solutionStatus);
	void removeSolution(UUID solutionId);
    String uploadFile(MultipartFile multipartFile);
}
