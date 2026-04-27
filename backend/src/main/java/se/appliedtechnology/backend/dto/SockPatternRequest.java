package se.appliedtechnology.backend.dto;

public record SockPatternRequest(double footLength, double footCircumference, double stitchGauge, double rowGauge, int needleCount, String name) {
}

