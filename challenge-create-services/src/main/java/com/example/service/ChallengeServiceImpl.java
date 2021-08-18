package com.example.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import java.io.File;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.example.dao.ChallengeDao;
import com.example.model.Challenge;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class ChallengeServiceImpl implements ChallengeService{
	
	@Autowired
	ChallengeDao dao;
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
	private AmazonS3 s3client;
    
    private static final Logger LOGGER = LoggerFactory.getLogger(ChallengeServiceImpl.class);


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
    @Async
    public String uploadFile(MultipartFile multipartFile) {
        LOGGER.info("File upload in progress.");
        String fileUrl = "";
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            fileUrl = endpointUrl + "/" + bucketName + "/" + fileName;
            uploadFileToS3Bucket(fileName, file);
            LOGGER.info("File upload is completed.");
            file.delete();    // To remove the file locally created in the project folder.
        } catch (final AmazonServiceException ex) {
            LOGGER.info("File upload is failed.");
        }
        return fileUrl;
    }
    
    
    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename()
                .replace(" ", "_");
    }
    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        LOGGER.info("converting");
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {
            LOGGER.error("Error converting the multi-part file to file= ");
        } catch (Exception exception) {
            LOGGER.info("Caught exception while converting");
        }
        return file;
    }
    private void uploadFileToS3Bucket(final String fileName, final File file) {
        try {
            LOGGER.info("Uploading file:" + fileName);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, file);
//            LOGGER.info("putObject:" + putObjectRequest);
            s3client.putObject(putObjectRequest);
            LOGGER.info("file Uploaded");
        } catch (Exception exc) {
            LOGGER.info("Exception caught:" + exc);
            LOGGER.info("Exception caught will uploading" + exc.getMessage());
        }
    }
    /////////

	@Override
	public void createChallenge(Challenge ch) {
		// TODO Auto-generated method stub
		dao.save(ch);
		
	}

	@Override
	public Collection<Challenge> getAllChallenges() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}


	@Override
	public void updateChallenge(Challenge ch) {
		// TODO Auto-generated method stub
		dao.save(ch);
	}

	@Override
	public Challenge updateViews(String id) {
		Challenge ch = dao.findById(id).get();
		ch.setViews(ch.getViews()+1);
		dao.save(ch);
		return ch;
	}


	@Override
	public Challenge findChallengeById(String id) {
		// TODO Auto-generated method stub
		Optional<Challenge> chh = dao.findById(id);
		return chh.get();
	}

	@Override
	public void deleteChallengeById(String id) {
		// TODO Auto-generated method stub
		
	}
	


}
