{
  "winner": "a",
  "a": {
    "score": 5,
    "criterionScores": {
      "trigger-fit": 5,
      "accessibility": 5,
      "state-quality": 5,
      "restraint": 4,
      "actionability": 5
    },
    "criticalFailures": [],
    "rationale": "Strong UI craft audit with ranked findings, rule IDs, concrete fixes, and a small implementation plan. Covers labels, focus, screen readers, touch targets, reduced motion, disabled/loading/error/success/duplicate-submit/mobile states."
  },
  "b": {
    "score": 3,
    "criterionScores": {
      "trigger-fit": 5,
      "accessibility": 3,
      "state-quality": 4,
      "restraint": 3,
      "actionability": 4
    },
    "criticalFailures": [
      "missing rule IDs",
      "missing smallest consistent implementation plan",
      "missing reduced-motion guidance"
    ],
    "rationale": "Recognizes the checkout UI craft task and gives many concrete fixes, but omits required rule IDs and an implementation plan. Accessibility coverage is incomplete, especially labels, touch targets, and reduced-motion."
  }
}
