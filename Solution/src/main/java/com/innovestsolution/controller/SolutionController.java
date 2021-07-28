package com.innovestsolution.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovest.solution.model.Solution;
import com.innovest.solution.service.SolutionService;


@RestController
@RequestMapping("/solutions")
public class SolutionController {
	private SolutionService solutionService;

	@Autowired
	public SolutionController(SolutionService solutionService) {
		super();
		this.solutionService = solutionService;
	}
	
	@PostMapping("/add")
	public ResponseEntity<Solution> addSolution(@RequestBody Solution solution){
		return new ResponseEntity<Solution>(solutionService.addSolution(solution),HttpStatus.CREATED);
	}
	@GetMapping("/listall")
	public ResponseEntity<List<Solution>> getAllSolutions(){
		return new ResponseEntity<List<Solution>>(solutionService.getAllSolutions(), HttpStatus.OK);
	}
}
