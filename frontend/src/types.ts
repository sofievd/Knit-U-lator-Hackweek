export type PatternStep = {
  id: string
  text: string
  explanation: string
}

export type PatternSection = {
  name: string
  steps: PatternStep[]
}

export type PatternResponse = {
  sections: PatternSection[];
};
