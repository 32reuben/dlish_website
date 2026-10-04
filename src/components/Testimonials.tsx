import { Star } from "lucide-react"

interface TestimonialsProps {
  testimonials: any[];
  googleReviewUrl?: string;
}

export function Testimonials({ testimonials, googleReviewUrl }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">Selected reviews from Google</h2>
          </div>
          {googleReviewUrl && (
            <a 
              href={googleReviewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex font-bold text-brand-dark hover:text-brand-accent transition-colors underline decoration-2 underline-offset-4"
            >
              Read all reviews on Google
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm flex flex-col h-full">
              <p className="text-stone-700 text-lg mb-6 flex-grow">"{review.text}"</p>
              <div>
                <p className="font-bold text-brand-dark">{review.displayName}</p>
                <p className="text-sm text-stone-500">{review.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
