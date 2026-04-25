package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class TemplateRenderer {

    public String renderTemplate(String template, Map<String, Object> params){
        String result = template;
        for(Map.Entry<String,Object> entry: params.entrySet()){
            result = result.replace(
                    "{{" + entry.getKey()+ "}}",
                    entry.getValue().toString());
        }
        return  result;
    }
}
