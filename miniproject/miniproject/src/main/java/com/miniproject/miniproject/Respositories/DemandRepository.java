package com.miniproject.miniproject.Respositories;

import com.miniproject.miniproject.Entities.Demand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandRepository extends JpaRepository<Demand,Integer> {
}
