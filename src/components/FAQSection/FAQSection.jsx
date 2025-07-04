import React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion"

export default function FAQSection() {
  const faqs = [
    {
      question: "How can I find last-minute flight deals?",
      answer: "Finding last-minute flights is easy on Google Flights. Select your departure and destination cities in the form on the top of the page, and use the calendar to pick travel dates and find the lowest fares available. You can even check for flights departing today."
    },
    {
      question: "How can I find cheap flights for a weekend getaway?",
      answer: "It's easy to use Google Flights to find deals on weekend getaways or even weeklong trips. Just enter your departure and destination cities near the top of the page."
    },
    {
      question: "How can I find flight deals if my travel plans are flexible?",
      answer: "It's easy to search for flights, even if your plans are up in the air. Tap Explore near the top of the page, then tap the calendar icon and toggle to Flexible dates."
    },
    {
      question: "How can I find cheap flights to anywhere?",
      answer: "You can find cheap flight deals to anywhere in the world on Google Flights. Just enter your departure city, choose 'Anywhere' as the destination, and select 'Explore'."
    },
    {
      question: "How can I get flight alerts for my trip?",
      answer: "You can track flight prices for specific dates or, if your plans are flexible, any dates. To get flight alerts for a specific round trip, choose your dates and flights and select Search."
    }
  ]

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-xl font-medium mb-6">Frequently asked questions</h2>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}