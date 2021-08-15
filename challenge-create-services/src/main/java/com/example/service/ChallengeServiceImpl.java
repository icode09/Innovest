package com.example.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dao.ChallengeDao;
import com.example.model.Challenge;


@Service
public class ChallengeServiceImpl implements ChallengeService{
	
	@Autowired
	ChallengeDao dao;

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
