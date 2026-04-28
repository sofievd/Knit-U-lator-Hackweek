package se.appliedtechnology.backend.controller;

import org.springframework.web.bind.annotation.*;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.dto.UpdatePatternRequest;
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
        String name = request.name();

       PatternResponse finalPattern = new PatternResponse(
               name != null ? name : generatedPattern.name(),
               generatedPattern.parameters(),
               generatedPattern.sections());
       patternService.savePattern("sock", 1, finalPattern);
        return finalPattern;
    }

    @GetMapping("/template")
    public List<PatternTemplate> getTemplate() {
        return patternGeneratorService.getTemplate();
    }

    @GetMapping("/{id}")
    public PatternResponse getPattern(@PathVariable String id){
        UUID uuid = UUID.fromString(id);
       return patternService.getById(uuid);
    }

    @GetMapping
    public List<PatternResponse> getAllPatterns(){
        return patternService.getAll();
    }

    @DeleteMapping ("/{id}")
    public void deletePattern(@PathVariable String id){
        UUID uuid = UUID.fromString(id);
        patternService.deletePattern(uuid);
    }

    @PutMapping("/{id}")
    public PatternResponse updatePattern(@PathVariable String id, @RequestBody UpdatePatternRequest request){
        UUID uuid = UUID.fromString(id);
        return patternService.update(uuid, request);
    }

    @PostMapping("/{id}/steps/toggle")
    public void toggleStep(
            @PathVariable UUID id,
            @RequestParam int sectionIndex,
            @RequestParam int stepIndex
    ) {
        patternService.toggle(id, sectionIndex, stepIndex);
    }

}

