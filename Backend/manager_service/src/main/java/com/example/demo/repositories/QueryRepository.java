package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.ManagerQuery;

import jakarta.transaction.Transactional;

public interface QueryRepository extends JpaRepository<ManagerQuery, Long> {

    List<ManagerQuery> findByMgruid(Long mgruid);

    List<ManagerQuery> findByFkPid(Long fkPid);

    List<ManagerQuery> findByTeamidFk(Long teamidFk);

    @Modifying
    @Transactional
    @Query("DELETE FROM ManagerQuery q WHERE q.teamidFk = :teamId")
    void deleteQueriesByTeamId(@Param("teamId") Long teamId);
}
