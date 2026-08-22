import TestimonialCarousel from "./TestimonialCarousel";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-600">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            What our clients say
          </h2>
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  );
}
