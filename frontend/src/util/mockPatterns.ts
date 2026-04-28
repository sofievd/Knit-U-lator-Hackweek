import type { PatternResponse } from "../types";

export type HatInput = {
  name: string;
  headCircumference: number;
  gauge: number;
  hatHeight?: number;
  fitType: string;
};

const STORAGE_KEY = "knitulator_mock_hats_patterns";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const readMockPatterns = () => {
  if (typeof window === "undefined") {
    return [] as PatternResponse[];
  }

  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]",
    ) as PatternResponse[];
  } catch {
    return [] as PatternResponse[];
  }
};

const writeMockPatterns = (patterns: PatternResponse[]) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(patterns));
};

const createStep = (
  text: string,
  explanation: string,
): PatternResponse["sections"][number]["steps"][number] => ({
  id: crypto.randomUUID(),
  text,
  explanation,
  completed: false,
});

export function getMockPatternById(id: string) {
  return readMockPatterns().find((pattern) => pattern.id === id) ?? null;
}

export function getMockPatterns(): PatternResponse[] {
  return readMockPatterns();
}

export async function mockGenerateHatPattern(
  input: HatInput,
): Promise<PatternResponse> {
  const delay = 500 + Math.floor(Math.random() * 500);
  await sleep(delay);

  const brimRows = Math.max(6, Math.round(input.headCircumference / 5));
  const bodyRows = Math.max(
    10,
    Math.round(((input.hatHeight ?? 24) * input.gauge) / 10),
  );

  const pattern: PatternResponse = {
    id: crypto.randomUUID(),
    name: input.name || "Hat Pattern",
    parameters: {
      head_circumference: input.headCircumference,
      gauge: input.gauge,
    },
    sections: [
      {
        name: "Brim",
        steps: [
          createStep(
            `Cast on for ${input.headCircumference.toFixed(1)} cm`,
            `Create the brim using a ${input.fitType} fit and your chosen gauge.`,
          ),
          createStep(
            `Work ${brimRows} rounds in ribbing`,
            "Knit the brim to create stretch and structure before the body.",
          ),
        ],
      },
      {
        name: "Body",
        steps: [
          createStep(
            "Increase or maintain stitch count for the hat body",
            "Transition from the brim into the main crown section.",
          ),
          createStep(
            `Work ${bodyRows} rounds until the hat measures about ${(input.hatHeight ?? 24).toFixed(1)} cm`,
            "Continue knitting until the hat reaches the desired height.",
          ),
        ],
      },
    ],
    notes: null,
  };

  const existing = readMockPatterns();
  writeMockPatterns([
    pattern,
    ...existing.filter((item) => item.id !== pattern.id),
  ]);

  return pattern;
}
