package com.StefanSergiu.Licenta.controller;

import com.StefanSergiu.Licenta.dto.type.TypeDto;
import com.StefanSergiu.Licenta.entity.Type;
import com.StefanSergiu.Licenta.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/types")
@CrossOrigin(origins = "http://localhost:3000")
public class TypeController {

    @Autowired
    TypeService typeService;

    //add Type
    @PostMapping("/admin/add")
    public ResponseEntity<TypeDto> addType(@RequestBody TypeDto typeDto){
        Type type = typeService.addType(Type.from(typeDto));
        return new ResponseEntity<>(TypeDto.from(type), HttpStatus.OK);
    }

    //get all Types
    @GetMapping("/all")
    ResponseEntity<List<TypeDto>> getTypes(){
        List<Type> Types = typeService.getTypes();
        List<TypeDto> TypeDtos = Types.stream().map(TypeDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(TypeDtos,HttpStatus.OK);
    }

    //get Type by id
    @GetMapping(value = "{id}")
    public ResponseEntity<TypeDto> getType(@PathVariable final Long id){
        Type Type = typeService.getType(id);
        return new ResponseEntity<>(TypeDto.from(Type),HttpStatus.OK);
    }


    //delete Type by id
    @DeleteMapping(value = "/admin/delete/{id}")
    public ResponseEntity<TypeDto> deleteType(@PathVariable final Long id){
        Type type = typeService.deleteType(id);
        return new ResponseEntity<>(TypeDto.from(type),HttpStatus.OK);
    }
}
