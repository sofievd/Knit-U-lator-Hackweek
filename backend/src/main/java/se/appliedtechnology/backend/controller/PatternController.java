package se.appliedtechnology.backend.controller;

import org.springframework.web.bind.annotation.*;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.entity.PatternTemplate;
import se.appliedtechnology.backend.service.PatternSaveService;
import se.appliedtechnology.backend.service.PatternService;

import java.util.List;

@RestController
@RequestMapping("/api/patterns")
@CrossOrigin(origins = "*")
public class PatternController {

    private final PatternService patternService;
    private final PatternSaveService saveService;

    public PatternController(PatternService patternService, PatternSaveService saveService) {
        this.patternService = patternService;
        this.saveService = saveService;
    }

    @PostMapping("/generate")
    public PatternResponse generatePattern(@RequestBody SockPatternRequest request) {

       PatternResponse generatedPattern =  patternService.generateSockPattern(request);
        String name = (String) request.name();

       PatternResponse finalPattern = new PatternResponse(
               name != null ? name : generatedPattern.name(),
               generatedPattern.parameters(),
               generatedPattern.sections());
       saveService.savePattern("sock", 1, finalPattern);
        return finalPattern;
    }

    @GetMapping
    public List<PatternTemplate> getTemplate() {
        return patternService.getTemplate();
    }

}

