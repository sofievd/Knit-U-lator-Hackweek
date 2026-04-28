export type PatternStep = {
  id: string;
  text: string;
  explanation: string | null;
  completed: boolean;
};

export type PatternSection = {
  name: string;
  steps: PatternStep[];
};

export type PatternResponse = {
  id: string;
  name: string;
  parameters: Record<string, number>;
  sections: PatternSection[];
  notes: string | null;
};
