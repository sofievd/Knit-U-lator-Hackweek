package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.SockPatternRequest;

import java.util.HashMap;
import java.util.Map;

@Service
public class ParameterService {
     private final int GAUCH_CM = 10;
     private final int GAUCHE_INCH = 4;

    public Map<String, Object> generateSock(SockPatternRequest request) {
        double footCircumference = request.footCircumference();
        double stitchGauge = request.stitchGauge();
        double rowGauge = request.rowGauge();
        double footLength = request.footLength();

        double stitchesPerCm = stitchGauge / GAUCH_CM;
        double rowsPerCm = rowGauge/ GAUCH_CM;

        int finalStitches = 8;
        int decreases = 4;
        int castOn = (int) Math.round(footCircumference * stitchesPerCm);
        int needleCount = request.needleCount();
        int stitchesPerNeedle = castOn / needleCount;
        int heelStitches = castOn / 2;
        int heelFlapRepeats = heelStitches / 2;
        int gussetPerSide = heelFlapRepeats + 1;
        int toeDecreaseRounds = (int) Math.ceil(castOn - finalStitches) / decreases;


        Map<String, Object> params = new HashMap<>();
        params.put("cast_on", castOn);
        params.put("stitches_per_needle", stitchesPerNeedle);
        params.put("needle_count", needleCount);
        params.put("heel_flap_stitches", heelStitches);
        params.put("heel_flap_repats", heelFlapRepeats);
        params.put("gusset_pickup_per_side", gussetPerSide);
        params.put("foot_lengt_cm", footLength);
        params.put("toe_repat_pairs", toeDecreaseRounds);
        params.put("final_stiches", finalStitches);

        return params;
    }
}
