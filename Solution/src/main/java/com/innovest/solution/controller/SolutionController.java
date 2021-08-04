package com.innovest.solution.controller;

import java.util.List;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.innovest.solution.model.Solution;
import com.innovest.solution.model.SolutionStatus;
import com.innovest.solution.service.SolutionService;


@RestController
@RequestMapping("/solutions/")
public class SolutionController {
	private SolutionService solutionService;

	@Autowired
	public SolutionController(SolutionService solutionService) {
		super();
		this.solutionService = solutionService;
	}
	@CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<Solution> addSolution(@RequestBody Solution solution){
		UUID uuid = UUID.randomUUID();
		solution.setSolutionId(uuid);
		solution.setSolutionStatus(SolutionStatus.NotReviewed);
		return new ResponseEntity<Solution>(solutionService.addSolution(solution),HttpStatus.CREATED);
	}
	@GetMapping("/listall")
	public ResponseEntity<List<Solution>> getAllSolutions(){
		return new ResponseEntity<List<Solution>>(solutionService.getAllSolutions(), HttpStatus.OK);
	}
	@GetMapping("/challenge")
	public ResponseEntity<List<Solution>> getSolutionsById(@RequestParam String challengeId){
		return new ResponseEntity<List<Solution>>(solutionService.getSolutionsByChallenge(UUID.fromString(challengeId)), HttpStatus.OK);
	}
}
