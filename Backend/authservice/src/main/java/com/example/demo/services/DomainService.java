package com.example.demo.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Domain;
import com.example.demo.repositories.DomainRepository;

@Service
public class DomainService {

    @Autowired
    private DomainRepository domainRepository;

    // SAVE / CREATE
    public Domain saveDomain(Domain domain) {
        return domainRepository.save(domain);
    }

    // GET BY ID
    public Domain getDomainById(int id) {
        Domain domain = null;
        Optional<Domain> option = domainRepository.findById(id);
        try {
            domain = option.get();
        } catch (NoSuchElementException e) {
            e.printStackTrace();
        }
        return domain;
    }

    // GET BY NAME
    public Domain getDomainByName(String dname) {
        return domainRepository.findBydname(dname).orElse(null);
    }

    // GET ALL
    public List<Domain> getAllDomains() {
        return domainRepository.findAll();
    }

    // DELETE
    public void deleteDomain(int id) {
        domainRepository.deleteById(id);
    }
}