package com.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.entity.ChatLog;

import jakarta.transaction.Transactional;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long>{
    // List<ChatLog> 반환
    @Transactional
    List<ChatLog> findByUser_UserNum(Long userNum);
    
    // 만약 가장 최근의 1개만 필요할 경우
    @Transactional
    Optional<ChatLog> findTopByUser_UserNum(Long userNum);
}