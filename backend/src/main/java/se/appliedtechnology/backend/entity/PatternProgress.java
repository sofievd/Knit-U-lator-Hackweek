package se.appliedtechnology.backend.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "pattern_progress",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"patternId", "sectionIndex", "stepIndex"}
        ))
public class PatternProgress {

    @Id
    @GeneratedValue
    private UUID id;

    private UUID patternId;

    private int sectionIndex;
    private int stepIndex;

    private boolean completed;

    public PatternProgress(UUID patternId, int sectionIndex, int stepIndex, boolean completed) {
        this.patternId = patternId;
        this.sectionIndex = sectionIndex;
        this.stepIndex = stepIndex;
        this.completed = completed;
    }

    public PatternProgress() {

    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getPatternId() {
        return patternId;
    }

    public void setPatternId(UUID patternId) {
        this.patternId = patternId;
    }

    public int getSectionIndex() {
        return sectionIndex;
    }

    public void setSectionIndex(int sectionIndex) {
        this.sectionIndex = sectionIndex;
    }

    public int getStepIndex() {
        return stepIndex;
    }

    public void setStepIndex(int stepIndex) {
        this.stepIndex = stepIndex;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return "PatternProgress{" +
                "id=" + id +
                ", patternId=" + patternId +
                ", sectionIndex=" + sectionIndex +
                ", stepIndex=" + stepIndex +
                ", completed=" + completed +
                '}';
    }
}
