package se.appliedtechnology.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.appliedtechnology.backend.entity.PatternProgress;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatternProgressRepository extends JpaRepository<PatternProgress, UUID> {


    Optional<PatternProgress> findByPatternIdAndSectionIndexAndStepIndex(
            UUID patternId, int sectionIndex, int stepIndex
    );

    List<PatternProgress> findByPatternId(UUID patternId);

}
