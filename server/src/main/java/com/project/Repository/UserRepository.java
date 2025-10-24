package com.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 카카오 고유 id로 사용자 찾기
    Optional<User> findByProviderId(String providerId);

    // userId로 사용자 찾기
    Optional<User> findByUserId(String userId);

    // userNum으로 유저 찾기
    Optional<User> findByUserNum(Long userNum);
}