export const site = {
  name: "Ardea Legal",
  legalName: "Ardea Legal",
  title: "Ardea Legal — Freelance advocaat",
  description:
    "Freelance advocaat in Nederland. Algemene juridische zaken voor particulieren en mkb. Duidelijk advies, eenvoudig contact.",
  tagline: "Juridische zaken, helder afgehandeld.",
  email: "berend@ArdeaLegal.nl",
  portrait: {
    src: "/images/portrait.jpg",
    fallback:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    alt: "Ardea Legal, freelance advocaat",
  },
  form: {
    skipLink: "Ga naar het formulier",
    nameLabel: "Uw naam",
    emailLabel: "E-mailadres",
    matterLabel: "Wat is uw vraag?",
    matterPlaceholder: "Een paar zinnen is genoeg om te beginnen.",
    submit: "Verstuur aanvraag",
    submitting: "Versturen…",
  },
  messages: {
    nameRequired: "Vul uw naam in.",
    emailRequired: "Vul uw e-mailadres in.",
    emailInvalid: "Vul een geldig e-mailadres in.",
    matterRequired: "Beschrijf uw zaak kort.",
    matterTooShort: "Voeg iets meer detail toe.",
    submitError: "Er ging iets mis. Probeer het opnieuw of mail direct.",
    submitSuccess:
      "Aanvraag ontvangen. We reageren binnen twee werkdagen.",
    apiInvalidRequest: "Ongeldige aanvraag.",
    apiNameRequired: "Naam is verplicht.",
    apiEmailInvalid: "Een geldig e-mailadres is verplicht.",
    apiMatterTooShort: "Voeg iets meer detail toe over uw zaak.",
    apiDeliveryFailed:
      "Uw aanvraag kon niet worden afgeleverd. Mail rechtstreeks naar {email}.",
  },
} as const;
