package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.dto.size.SizeDto;
import com.StefanSergiu.Licenta.entity.Size;
import com.StefanSergiu.Licenta.entity.Type;
import com.StefanSergiu.Licenta.repository.SizeRepository;
import com.StefanSergiu.Licenta.repository.TypeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SizeService {
    @Autowired
   SizeRepository sizeRepository;

    @Autowired
    TypeRepository typeRepository;

    public SizeService(SizeRepository sizeRepository) {
        this.sizeRepository = sizeRepository;
    }

    public Size addSize(SizeDto sizeDto){
        Size size = new Size();
        Type type = typeRepository.findById(sizeDto.getTypeId())
                .orElseThrow(()->new EntityNotFoundException("Type with id "+ " not found"));
        size.setType(type);
        size.setValue(sizeDto.getValue());

        type.addSize(size);
        return sizeRepository.save(size);

    }

}
