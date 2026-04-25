package se.appliedtechnology.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import se.appliedtechnology.backend.entity.PatternTemplate;

import java.util.List;
import java.util.UUID;

@Repository
public interface PatternTemplateRepository extends JpaRepository<PatternTemplate, UUID> {

    @Query("SELECT p FROM PatternTemplate p " +
            "WHERE p.patternVariantId = :variantId " +
            "AND p.patternType = :type " +
            "ORDER BY p.sectionOrder ASC, p.stepOrder ASC")
    List<PatternTemplate>  findByPatternTypeAndPatternVariantId(
            @Param("type") String patternType,
            @Param("variantId") int patternVariantId
    );
}
