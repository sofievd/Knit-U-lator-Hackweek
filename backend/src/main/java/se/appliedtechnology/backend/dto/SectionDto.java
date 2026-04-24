package se.appliedtechnology.backend.dto;

import java.util.List;

public record SectionDto(String name, List<StepDto> steps) {
}

