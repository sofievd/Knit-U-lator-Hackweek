package se.appliedtechnology.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.dto.UpdatePatternRequest;
import se.appliedtechnology.backend.entity.Pattern;
import se.appliedtechnology.backend.entity.PatternTemplate;
import se.appliedtechnology.backend.service.PatternService;
import se.appliedtechnology.backend.service.PatternGeneratorService;

import java.net.URI;
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
    public ResponseEntity<?> generatePattern(@RequestBody SockPatternRequest request, @AuthenticationPrincipal Jwt principal) {

       Pattern generatedPattern =  patternGeneratorService.generateSockPattern(request);
       generatedPattern.setUserId(principal.getId());

       Pattern saved = patternService.savePattern("sock", 1, generatedPattern);
       PatternResponse finalPattern  = new PatternResponse(
               saved.getId(),
               saved.getName(),
               saved.getParameters(),
               saved.getStructure(),
               saved.getNotes()
       );
       URI uri = URI.create("/api/patterns/"+finalPattern.id());
        return ResponseEntity.created(uri).body(finalPattern);
    }

    @GetMapping("/public/template")
    public ResponseEntity<?> getTemplate() {
        List<PatternTemplate> templates = patternGeneratorService.getTemplate();
        return ResponseEntity.ok().body(templates);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPattern(@PathVariable String id, @AuthenticationPrincipal Jwt principal){
        UUID uuid = UUID.fromString(id);
        PatternResponse response = patternService.getByIdAndUserID(uuid);
       return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<?> getAllPatterns(@AuthenticationPrincipal Jwt principal){
        List<PatternResponse> patterns =patternService.getAllFromUser(principal.getId());
        return ResponseEntity.ok().body(patterns);
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<?> deletePattern(@PathVariable String id,@AuthenticationPrincipal Jwt principal){
        UUID uuid = UUID.fromString(id);
        patternService.deletePatternFromUser(uuid);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePattern(@PathVariable String id, @RequestBody UpdatePatternRequest request, @AuthenticationPrincipal Jwt principal){
        UUID uuid = UUID.fromString(id);
        PatternResponse updatedPattern = patternService.update(uuid, request);
        return ResponseEntity.ok().body(updatedPattern);
    }

    @PostMapping("/{id}/steps/toggle")
    public ResponseEntity<?> toggleStep(
            @PathVariable UUID id,
            @RequestParam int sectionIndex,
            @RequestParam int stepIndex,
            @AuthenticationPrincipal Jwt principal
    ) {
        PatternResponse response = patternService.toggle(id, sectionIndex, stepIndex);
        return ResponseEntity.ok().body(response);
    }

}

