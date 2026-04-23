package se.appliedtechnology.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.service.PatternService;

@RestController
@RequestMapping("/api/patterns")
public class PatternController {

	private final PatternService patternService;

	public PatternController(PatternService patternService) {
		this.patternService = patternService;
	}

	@PostMapping("/generate")
	public String generatePattern(@RequestBody SockPatternRequest request) {
		return patternService.generatePattern(request);
	}
}

