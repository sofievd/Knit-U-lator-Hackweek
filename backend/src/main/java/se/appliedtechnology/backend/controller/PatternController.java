package se.appliedtechnology.backend.controller;

import org.springframework.web.bind.annotation.*;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.entity.PatternTemplate;
import se.appliedtechnology.backend.service.PatternService;
import se.appliedtechnology.backend.service.PatternGeneratorService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/patterns")
@CrossOrigin(origins = "*")
public class PatternController {

    private final PatternGeneratorService patternGeneratorService;
    private final PatternService patternService;

    public PatternController(PatternGeneratorService patternGeneratorService, PatternService saveService) {
        this.patternGeneratorService = patternGeneratorService;
        this.patternService = saveService;
    }

    @PostMapping("/generate")
    public PatternResponse generatePattern(@RequestBody SockPatternRequest request) {

       PatternResponse generatedPattern =  patternGeneratorService.generateSockPattern(request);
        String name = (String) request.name();

       PatternResponse finalPattern = new PatternResponse(
               name != null ? name : generatedPattern.name(),
               generatedPattern.parameters(),
               generatedPattern.sections());
       patternService.savePattern("sock", 1, finalPattern);
        return finalPattern;
    }

    @GetMapping
    public List<PatternTemplate> getTemplate() {
        return patternGeneratorService.getTemplate();
    }

    @GetMapping("/{id}")
    public PatternResponse getPattern(@PathVariable String id){
        UUID uuid = UUID.fromString(id);
       return patternService.getById(uuid);
    }

}

