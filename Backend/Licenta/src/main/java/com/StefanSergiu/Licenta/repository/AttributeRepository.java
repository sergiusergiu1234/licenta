package com.StefanSergiu.Licenta.repository;


import com.StefanSergiu.Licenta.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {
     Optional<Attribute> findById(Long id);
}
