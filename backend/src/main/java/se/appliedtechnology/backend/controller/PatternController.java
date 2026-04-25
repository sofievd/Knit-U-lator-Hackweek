package se.appliedtechnology.backend.controller;

import org.springframework.web.bind.annotation.*;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.entity.PatternTemplate;
import se.appliedtechnology.backend.service.PatternService;

import java.util.List;

@RestController
@RequestMapping("/api/patterns")
@CrossOrigin(origins = "*")
public class PatternController {

	private final PatternService patternService;

	public PatternController(PatternService patternService) {
		this.patternService = patternService;
	}

	@PostMapping("/generate")
	public PatternResponse generatePattern(@RequestBody SockPatternRequest request) {
		return patternService.generatePattern(request);
	}

	@GetMapping
	public List<PatternTemplate> getTemplate(){
		return patternService.getTemplate();
	}

}

