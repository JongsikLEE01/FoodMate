package com.project.repository;

import com.project.entity.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailRepository extends JpaRepository<UserDetail, Long> {
}