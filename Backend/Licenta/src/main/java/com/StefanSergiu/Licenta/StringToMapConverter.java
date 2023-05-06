package com.StefanSergiu.Licenta;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class StringToMapConverter implements Converter<String, Map<String, String>> {

    @Override
    public Map<String, String> convert(String source) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(source, new TypeReference<Map<String, String>>() {});
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid request parameter format", e);
        }
    }
}