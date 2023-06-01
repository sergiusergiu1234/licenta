package com.StefanSergiu.Licenta.repository;


import com.StefanSergiu.Licenta.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {
     Optional<Attribute> findById(Long id);

     @Query("SELECT new map(a.name as attributeName, GROUP_CONCAT(DISTINCT pa.value) as attributeValues) FROM Attribute a JOIN a.productAttributes pa JOIN a.type t WHERE t.name = :typeName GROUP BY a.name")
     List<Map<String, Object>> findAttributeValuesByTypeName(@Param("typeName") String typeName);


}
