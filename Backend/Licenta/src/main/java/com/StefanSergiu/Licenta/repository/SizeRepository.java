package com.StefanSergiu.Licenta.repository;

import com.StefanSergiu.Licenta.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size,Long> {
    List<Size> findByTypeId(Long typeId);
}
