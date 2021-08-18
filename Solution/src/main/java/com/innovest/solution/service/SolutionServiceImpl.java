package com.innovest.solution.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.util.UUID;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.innovest.solution.model.ReviewComment;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.innovest.solution.model.Solution;
import com.innovest.solution.model.SolutionStatus;
import com.innovest.solution.repository.SolutionRepository;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;


@Service
public class SolutionServiceImpl implements SolutionService {

    SolutionRepository repo;
    private AmazonS3 s3client;

    @Autowired
    public SolutionServiceImpl(SolutionRepository repo) {
        super();
        this.repo = repo;
    }

    @Autowired
    private MongoTemplate mongoTemplate;

	@Value("${aws.s3.bucket}")
	private String bucketName;
	@Value("${aws.s3.endpointUrl}")
	private String endpointUrl;
	@Value("${aws.access_key_id}")
	private String accessKeyId;
	@Value("${aws.secret_access_key}")
	private String secretAccessKey;
	@Value("${aws.s3.region}")
	private String region;

	@PostConstruct
	private void initializeAmazon() {
		BasicAWSCredentials creds = new BasicAWSCredentials(accessKeyId, secretAccessKey);
		this.s3client = AmazonS3ClientBuilder
				.standard()
				.withRegion(Regions.fromName(region))
				.withCredentials(new AWSStaticCredentialsProvider(creds))
				.build();
	}

    @Override
    public Solution addSolution(Solution solution) {
        return repo.save(solution);
    }

    @Override
    public Solution updateSolution(Solution solution) {
//        Solution toUpdate = repo.findBySolutionId(solution.getSolutionId());
//
//        System.out.println(toUpdate.getSolutionId());
//        toUpdate.setCodeUrl(solution.getCodeUrl());
//        toUpdate.setSolutionDescription(solution.getSolutionDescription());
//        toUpdate.setSolutionTitle(solution.getSolutionTitle());
//        toUpdate.setSolutionStatus(solution.getSolutionStatus());
//        return repo.save(toUpdate);

        Query query = new Query();
        query.addCriteria(Criteria.where("solutionId").is(solution.getSolutionId()));
        Update update = new Update();
        update.set("solutionTitle", solution.getSolutionTitle());
        update.set("codeUrl", solution.getCodeUrl());
        update.set("solutionDescription", solution.getSolutionDescription());
        Solution updatedSolution = mongoTemplate.findAndModify(query, update, Solution.class);
        return updatedSolution;
    }

    @Override
    public Solution updateFile(Solution solution) {
        Query query = new Query();
        query.addCriteria(Criteria.where("solutionId").is(solution.getSolutionId()));
        Update update = new Update();
        update.set("solutionTitle", solution.getSolutionTitle());
        update.set("codeUrl", solution.getCodeUrl());
        update.set("solutionDescription", solution.getSolutionDescription());
        update.set("fileByte", solution.getFileByte());
        update.set("fileName", solution.getFileName());
        update.set("documentUrl", solution.getDocumentUrl());
        Solution updatedSolution = mongoTemplate.findAndModify(query, update, Solution.class);
        return updatedSolution;
    }

    @Override
    public Solution updateSolutionStatus(UUID solutionId, SolutionStatus solutionStatus) {
        Query query = new Query();
        Update update = new Update().set("solutionStatus", solutionStatus);
        query.addCriteria(Criteria.where("solutionId").is(solutionId));

        Solution solution = mongoTemplate.findAndModify(query, update, Solution.class);
        return solution;
    }

//    @Override
//    public Solution updateReviewComments(UUID solutionId, String[] reviewComments) {
//        Query query = new Query();
//        Update update = new Update().set("reviewComments", reviewComments);
//        query.addCriteria(Criteria.where("solutionId").is(solutionId));
//
//        Solution solution = mongoTemplate.findAndModify(query, update, Solution.class);
//        return solution;
//    }

    @Override
    public Solution updateReviewComments(ReviewComment reviewComment, UUID solutionId) {
        Solution solution = repo.findBySolutionId(solutionId);
        Query query = new Query(Criteria.where("solutionId").is(solutionId));
        Update updateQuery = new Update();
        List<ReviewComment> existingFeed = solution.getReviewComments();
        if (existingFeed == null) {
            List<ReviewComment> feedbackList = new ArrayList<>();
            feedbackList.add(reviewComment);
            updateQuery.set("reviewComments", feedbackList);
        } else {
            existingFeed.add(reviewComment);
            updateQuery.set("reviewComments", existingFeed);
        }
        UpdateResult result = mongoTemplate.upsert(query, updateQuery, "solution");
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
        Query query = new Query();
        query.addCriteria(Criteria.where("solutionStatus").is(solutionStatus));
        List<Solution> solutions = mongoTemplate.find(query, Solution.class);
        return solutions;
    }

    @Override
    public List<Solution> getSolutionsByChallenge(UUID challengeId) {
        // TODO Auto-generated method stub
        Query query = new Query();
        query.addCriteria(Criteria.where("challengeId").is(challengeId));
        List<Solution> solutions = mongoTemplate.find(query, Solution.class);
        return solutions;
    }

    @Override
    public List<Solution> getSolutionsByUser(String solvedBy) {
        // TODO Auto-generated method stub
        Query query = new Query();
        query.addCriteria(Criteria.where("solvedBy").is(solvedBy));
        List<Solution> solutions = mongoTemplate.find(query, Solution.class);
        return solutions;
    }

    @Override
    public void removeSolution(UUID solutionId) {
        // TODO Auto-generated method stub
        repo.deleteById(solutionId);
    }

    @Override
    @Async
    public String uploadFile(MultipartFile multipartFile) {
        String fileUrl = "";
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            fileUrl = endpointUrl + "/" + bucketName + "/" + fileName;
            uploadFileToS3Bucket(fileName, file);
            file.delete();    // To remove the file locally created in the project folder.
        } catch (final AmazonServiceException ex) {
        }
        return fileUrl;
    }

    @Override
    public Solution getSolutionById(UUID solutionId) {
        return repo.findBySolutionId(solutionId);
    }


    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename()
                .replace(" ", "_");
    }

    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {

        } catch (Exception exception) {

        }
        return file;
    }

    private void uploadFileToS3Bucket(final String fileName, final File file) {
        try {
            final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, file);
            s3client.putObject(putObjectRequest);
        } catch (Exception exc) {
        }
    }


}
