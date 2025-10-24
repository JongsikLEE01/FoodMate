package com.project.repository;

import com.project.entity.UserDetail;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetail, Long> {
    // 유저 찾기
    Optional<UserDetail> findByUserNum(Long userNum);
}