package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByUname(String uname);
    boolean existsByEmail(String email);
    
    long count();
    long countByRole_Rid(Integer rid);
    long countByRole_Rname(String rname);

}
