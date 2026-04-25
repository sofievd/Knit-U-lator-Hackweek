package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.SockPatternRequest;

import java.util.HashMap;
import java.util.Map;

@Service
public class ParameterService {

    public Map<String, Object> generateSock(SockPatternRequest request) {
        double footcir = request.footCircumference();
        double stichGauge = request.gauge();
        double rowGauge = request.gauge();
        double footLenght = request.footLength();

        double stitchesPerCm = stichGauge / 10;

        int finalsStiches = 8;
        int decreases = 4;
        int castOn = (int) Math.round(footcir * stitchesPerCm);
        int needleCount = request.needleCount();
        int stichesPerNeedle = castOn / needleCount;
        int heelStiches = castOn / 2;
        int heelFlapRepeats = heelStiches / 2;
        int gussetPerSide = heelFlapRepeats + 1;
        int toeDecreaseRounds = (int) Math.ceil(castOn - finalsStiches) / decreases;


        Map<String, Object> params = new HashMap<>();
        params.put("cast_on", castOn);
        params.put("stitches_per_needle", stichesPerNeedle);
        params.put("needle_count", needleCount);
        params.put("heel_flap_stitches", heelStiches);
        params.put("heel_flap_repats", heelFlapRepeats);
        params.put("gusset_pickup_per_side", gussetPerSide);
        params.put("foot_lengt_cm", footLenght);
        params.put("toe_repat_pairs", toeDecreaseRounds);
        params.put("final_stiches", finalsStiches);

        return params;
    }
}
