package com.innovest.solution.controller;

import java.io.IOException;

import java.util.List;

import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.innovest.solution.model.ReviewComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.innovest.solution.model.Solution;
import com.innovest.solution.model.SolutionStatus;
import com.innovest.solution.service.SolutionService;
import org.springframework.web.multipart.MultipartFile;


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
	public ResponseEntity<Solution> addSolution(@RequestParam(value = "file",required = false )MultipartFile file, @RequestParam(value = "input" )String input) throws IOException {
		Solution solution = new ObjectMapper().readValue(input, Solution.class);
		UUID uuid = UUID.randomUUID();
		solution.setSolutionId(uuid); 
		solution.setSolutionStatus(SolutionStatus.NotReviewed);
		System.out.println("solution got:"+solution.getSolutionTitle());
		System.out.println("filename:"+file.getOriginalFilename());
		solution.setFileByte(file.getBytes());
		solution.setFileName(file.getOriginalFilename());
		String fileUrl = solutionService.uploadFile(file);
		final String response = "[" + file.getOriginalFilename() + "] uploaded successfully.";
		solution.setDocumentUrl(fileUrl);
//		if(file!=null) {
//			solution.setFileByte(file.getBytes());
//			solution.setFileName(file.getName());
//			String fileUrl=solutionService.uploadFile(file);
//			solution.setDocumentUrl(fileUrl);
//		}

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

	@PutMapping("/updateFile")
	public ResponseEntity<Solution> updateFile(@RequestParam(value = "file",required = false )MultipartFile file, @RequestParam(value = "input" )String input) throws IOException {
		Solution solution = new ObjectMapper().readValue(input, Solution.class);
		System.out.println("solution id:"+solution.getSolutionId());
		System.out.println("file name:"+file.getOriginalFilename());
		solution.setFileByte(file.getBytes());
		solution.setFileName(file.getOriginalFilename());
		String fileUrl = solutionService.uploadFile(file);
		final String response = "[" + file.getOriginalFilename() + "] uploaded successfully.";
		solution.setDocumentUrl(fileUrl);
		return new ResponseEntity<Solution>(solutionService.updateFile(solution),HttpStatus.CREATED);
	}

	@PutMapping("/updateSolution")
	public ResponseEntity<Solution> updateSolution(@RequestParam(value = "input" )String input) throws JsonProcessingException {
		Solution solution = new ObjectMapper().readValue(input, Solution.class);
		System.out.println("solution id:"+solution.getSolutionId());
		System.out.println("solution title:"+solution.getSolutionTitle());
		return new ResponseEntity<Solution>(solutionService.updateSolution(solution),HttpStatus.CREATED);
	}

	@PutMapping("/update/solutionStatus")
	public ResponseEntity<Solution> updateSolutionStatus(@RequestParam(required = true) String solutionId ,@RequestParam(required = true) String solutionStatus){
		System.out.println(solutionId);
		return new ResponseEntity<Solution>(solutionService.updateSolutionStatus(UUID.fromString(solutionId), SolutionStatus.valueOf(solutionStatus) ),HttpStatus.CREATED);
	}

	@PutMapping("/update/reviewComments/{solutionId}")
	public ResponseEntity<Solution> updateReviewComments(@RequestBody ReviewComment reviewComments, @PathVariable("solutionId") UUID solutionId){
		System.out.println(solutionId);
		System.out.println("feedback:"+reviewComments.getComment());
		return new ResponseEntity<Solution>(solutionService.updateReviewComments(reviewComments, solutionId),HttpStatus.CREATED);
	}

		@GetMapping("getSolution/{solutionId}")
	public ResponseEntity<Solution> getSolutionById(@PathVariable("solutionId") UUID solutionId) {
		return new ResponseEntity<Solution>(solutionService.getSolutionById(solutionId),HttpStatus.OK);
	}

}
