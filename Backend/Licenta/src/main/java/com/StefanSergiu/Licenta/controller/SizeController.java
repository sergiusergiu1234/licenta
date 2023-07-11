package com.StefanSergiu.Licenta.controller;

import com.StefanSergiu.Licenta.dto.attribute.AttributeDto;
import com.StefanSergiu.Licenta.dto.attribute.CreateNewAttributeDto;
import com.StefanSergiu.Licenta.dto.size.SizeDto;
import com.StefanSergiu.Licenta.entity.Attribute;
import com.StefanSergiu.Licenta.entity.Size;
import com.StefanSergiu.Licenta.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/size")
@CrossOrigin(origins = "http://localhost:3000")
public class SizeController {


    @Autowired
    SizeService sizeService;

    //create new size
    @PostMapping("/admin/add")
    public ResponseEntity<SizeDto> createAttribute(@RequestBody final SizeDto sizeDto){
        Size size =   sizeService.addSize(sizeDto);
        return new ResponseEntity<>(SizeDto.from(size), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("admin/delete/{id}")
    public ResponseEntity<SizeDto> deleteSize(@PathVariable final Long id){
        Size size = sizeService.deleteSize(id);
        return new ResponseEntity<>(SizeDto.from(size), HttpStatus.OK);
    }


}
