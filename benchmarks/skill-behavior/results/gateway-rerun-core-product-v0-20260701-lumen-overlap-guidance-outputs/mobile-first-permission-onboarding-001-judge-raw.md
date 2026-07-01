{
  "AnswerA": {
    "mobile-ergonomics": {
      "score": 5,
      "rationale": "Addresses safe areas, 44pt touch targets, keyboard types, scroll-to-error, and viewport constraints."
    },
    "permission-timing": {
      "score": 5,
      "rationale": "Moves asks to contextual moments, uses pre-permissions, and ensures denial doesn't block core flow completion."
    },
    "activation": {
      "score": 5,
      "rationale": "Decouples heavy tasks and provides skeleton screens to reduce friction during account creation and trial start."
    },
    "accessibility": {
      "score": 5,
      "rationale": "Comprehensively covers screen readers, focus trapping, dynamic type scaling, and reduced-motion preferences."
    },
    "measurement": {
      "score": 4,
      "rationale": "Defines necessary telemetry events for the funnel but lacks explicit guardrail metrics to monitor regressions."
    }
  },
  "AnswerB": {
    "mobile-ergonomics": {
      "score": 2,
      "rationale": "Mentions bottom sheets but misses required artifacts: safe-area fixes, thumb reach, touch targets, and keyboard handling."
    },
    "permission-timing": {
      "score": 5,
      "rationale": "Uses contextual soft asks and pre-permissions with 'Maybe Later' options, successfully avoiding hard blocks on denial."
    },
    "activation": {
      "score": 4,
      "rationale": "Progressive disclosure and SSO effectively reduce friction, moving heavy commitment steps until after value is proven."
    },
    "accessibility": {
      "score": 0,
      "rationale": "Fails to address any accessibility requirements like screen readers, focus, or text scaling."
    },
    "measurement": {
      "score": 4,
      "rationale": "Provides funnel and OS prompt conversion metrics, but misses guardrail metrics to catch unintended regressions."
    }
  }
}
