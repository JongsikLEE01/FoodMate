package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.entity.DietData;

@Repository
public interface DietDataRepository extends JpaRepository<DietData, Long>{
    // 보유 질병 목록 중 해당하는 JSON 반환
    @Query("SELECT d.dataJson FROM DietData d WHERE d.diseaseName IN :diseases")
    List<String> findJsonDataByDiseaseNameIn(@Param("diseases") List<String> diseaseNames);
}
