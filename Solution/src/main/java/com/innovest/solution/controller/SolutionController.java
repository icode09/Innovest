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
@CrossOrigin
public class SolutionController {
	private SolutionService solutionService;

	@Autowired
	public SolutionController(SolutionService solutionService) {
		super();
		this.solutionService = solutionService;
	}
	@PostMapping("/add")
	public ResponseEntity<Solution> addSolution(@RequestBody Solution solution){
		UUID uuid = UUID.randomUUID();
		solution.setSolutionId(uuid);
		solution.setSolutionStatus(SolutionStatus.NotReviewed);
		return new ResponseEntity<Solution>(solutionService.addSolution(solution),HttpStatus.CREATED);
	}
	@CrossOrigin
	@GetMapping("/")
	public ResponseEntity<List<Solution>> getAllSolutions(@RequestParam(required = false) String challengeId ,@RequestParam(required = false) String solvedBy ,@RequestParam(required = false) String solutionStatus){
		if(challengeId!=null){
			return new ResponseEntity<List<Solution>>(solutionService.getSolutionsByChallenge(UUID.fromString(challengeId)), HttpStatus.OK);
		}
		if(solvedBy!=null){
			return new ResponseEntity<List<Solution>>(solutionService.getSolutionsByUser(solvedBy), HttpStatus.OK);
		}
		if(solutionStatus!=null){
			return new ResponseEntity<List<Solution>>(solutionService.getSolutionsBySolutionStatus(SolutionStatus.valueOf(solutionStatus)), HttpStatus.OK);
		}
		return new ResponseEntity<List<Solution>>(solutionService.getAllSolutions(), HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<Solution> updateSolution(@RequestBody Solution solution){
		System.out.println(solution);
		return new ResponseEntity<Solution>(solutionService.updateSolution(solution),HttpStatus.CREATED);
	}

	@PutMapping("/update/solutionStatus")
	public ResponseEntity<Solution> updateSolutionStatus(@RequestParam(required = true) String solutionId ,@RequestParam(required = true) String solutionStatus){
		System.out.println(solutionId);
		return new ResponseEntity<Solution>(solutionService.updateSolutionStatus(UUID.fromString(solutionId), SolutionStatus.valueOf(solutionStatus) ),HttpStatus.CREATED);
	}

}
