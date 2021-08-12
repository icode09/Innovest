package com.example.uploadfile;

import org.springframework.boot.SpringApplication;

import javax.annotation.Resource;

import org.springframework.boot.CommandLineRunner;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.uploadfile.service.StorageService;



@SpringBootApplication
public class UploadingFilesApplication implements CommandLineRunner{
	@Resource
	StorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(UploadingFilesApplication.class, args);
	}
	@Override
	public void run(String... arg) throws Exception {
		storageService.deleteAll();
		storageService.init();
	}

}
