package com.example.demo.admin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Domain;
import com.example.demo.repositories.DomainRepository;

@Service
public class AdminDomainService {

    @Autowired
    DomainRepository repo;

    public List<Domain> getAll(){
        return repo.findAll();
    }

    public Domain create(Domain d){
        return repo.save(d);
    }

    public Domain update(Integer id, Domain d){
        Domain old = repo.findById(id).get();
        old.setDname(d.getDname());
        return repo.save(old);
    }

    public void delete(Integer id){
        repo.deleteById(id);
    }
}

