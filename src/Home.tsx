

import { Link } from "react-router-dom";

function Home() {

  const events = [
    {
      name: "Weddings",
      description: "Make your special day unforgettable.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    },
    {
      name: "Birthdays",
      description: "Celebrate another year in style.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800"
    },
    {
      name: "Corporate Events",
      description: "Bring people together professionally.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
    },
    {
      name: "Anniversaries",
      description: "Make every milestone memorable.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
    }
  ];

  const services = [
    "Catering",
    "Decoration",
    "Photography",
    "Venues",
    "DJ & Music",
    "Makeup Artists"
  ];

  return (
    <div className="bg-[#F5F8F3] text-[#26352E]">

      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">

        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#57816A]">
            PLAN · DISCOVER · CELEBRATE
          </p>

          <h1 className="max-w-xl text-5xl font-semibold leading-[1.15] tracking-tight text-[#185744] md:text-6xl">
            Every occasion deserves something extraordinary.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#78837A]">
            From intimate gatherings to grand celebrations,
            discover the right people and services to make
            every moment count.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="rounded-lg bg-[#185744] px-7 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#123F35] hover:shadow-lg"
            >
              Start Planning →
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-[#B9CEBD] px-7 py-3.5 font-semibold text-[#185744] transition hover:bg-[#EAF1EA]"
            >
              Explore MeetCraft
            </Link>
          </div>

          <div className="mt-12 flex gap-10 border-t border-[#DCE4DC] pt-7">
            <div>
              <h3 className="text-2xl font-bold text-[#185744]">One</h3>
              <p className="mt-1 text-sm text-[#78837A]">Planning destination</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#185744]">Many</h3>
              <p className="mt-1 text-sm text-[#78837A]">Event possibilities</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#185744]">Endless</h3>
              <p className="mt-1 text-sm text-[#78837A]">Memories</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl border border-[#B9CEBD] md:-right-5 md:-top-5" />

          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200"
            alt="Beautiful wedding celebration"
            className="relative h-[430px] w-full rounded-2xl object-cover shadow-xl transition duration-700 hover:scale-[1.015]"
          />

          <div className="absolute bottom-6 left-6 max-w-xs rounded-xl bg-[#F9FAF6] p-5 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#57816A]">
              YOUR NEXT CHAPTER
            </p>
            <p className="mt-2 text-lg font-semibold text-[#185744]">
              Let's make it memorable.
            </p>
          </div>
        </div>

{/* <div className="relative"> */}

  {/* Decorative border */}
  {/* <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl border border-[#B9CEBD]" /> */}

  {/* Image carousel */}
  {/* <div className="relative h-[430px] overflow-hidden rounded-2xl shadow-xl"> */}

    {/* Sliding images */}
    {/* <div
      className="flex h-full transition-transform duration-1000 ease-in-out"
      style={{
        transform: `translateX(-${currentImage * 100}%)`
      }}
    >
      {heroImages.map((item, index) => (
        <img
          key={index}
          src={item.image}
          alt={item.title}
          className="h-full w-full flex-shrink-0 object-cover"
        />
      ))}
    </div> */}

    {/* Dark overlay */}
   {/* </div></div> <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" /> */}

    {/* Bottom text */}
    {/* <div className="absolute bottom-8 left-7 text-white">
      <p className="text-sm uppercase tracking-widest text-white/80">
        MEETCRAFT PRESENTS
      </p>

      <h2 className="mt-2 text-3xl font-semibold">
        {heroImages[currentImage].title}
      </h2>
    </div> */}

    {/* Previous button */}
    {/* <button
      onClick={() =>
        setCurrentImage((prev) =>
          (prev - 1 + heroImages.length) % heroImages.length
        )
      }
      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-4 py-3 text-[#185744] transition hover:bg-white"
    >
      &#10094;
    </button> */}

    {/* Next button */}
    {/* <button
      onClick={() =>
        setCurrentImage((prev) =>
          (prev + 1) % heroImages.length
        )
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-4 py-3 text-[#185744] transition hover:bg-white"
    >
      &#10095;
    </button> */}

    {/* Slide indicators */}
    {/* <div className="absolute bottom-4 right-6 flex gap-2">
      {heroImages.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentImage(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            currentImage === index
              ? "w-7 bg-white"
              : "w-2 bg-white/60"
          }`}
        />
      ))}
    </div>

  </div>
</div> */}

      </section>


      {/* EVENT CATEGORIES */}
      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#57816A]">
                FIND YOUR INSPIRATION
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#185744] md:text-4xl">
                What are we celebrating?
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#78837A]">
              Every event is different. Find the inspiration
              and services that match your occasion.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {events.map((event, index) => (
                //instead of button yahaan simply link laga diya
              <Link
                to="/signup"
                key={event.name}
                className="group overflow-hidden rounded-xl bg-[#F5F8F3] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold tracking-widest text-[#57816A]">
                    0{index + 1} / EVENT
                  </p>

                  <h3 className="text-xl font-semibold text-[#185744]">
                    {event.name}
                  </h3>

                  <p className="mt-2 text-sm text-[#78837A]">
                    {event.description}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-[#185744]">
                    Discover more →
                  </p>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>


      {/* SERVICES SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#57816A]">
              EVERYTHING IN ONE PLACE
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#185744]">
              The right services make all the difference.
            </h2>

            <p className="mt-5 leading-7 text-[#78837A]">
              Finding the right professionals shouldn't be
              complicated. MeetCraft brings different event
              services together so you can focus on what matters.
            </p>

            <Link
              to="/signup"
              className="mt-8 inline-block rounded-lg bg-[#185744] px-7 py-3.5 font-semibold text-white transition hover:bg-[#123F35]"
            >
              Find Your Vendors →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div
                key={service}
                className="group rounded-xl border border-[#DCE4DC] bg-white p-6 transition duration-300 hover:border-[#57816A] hover:bg-[#EAF1EA] hover:shadow-md"
              >
                <span className="text-sm font-semibold text-[#91AA94]">
                  0{index + 1}
                </span>

                <h3 className="mt-5 text-lg font-semibold text-[#185744]">
                  {service}
                </h3>

                <p className="mt-2 text-sm text-[#78837A]">
                  Discover professionals →
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="bg-[#EAF1EA] px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#57816A]">
              SIMPLE BY DESIGN
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-[#185744] md:text-4xl">
              Three steps. One beautiful celebration.
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Choose your event",
                description: "Tell us what you're planning and where your celebration will take place."
              },
              {
                number: "02",
                title: "Discover vendors",
                description: "Explore professionals and find services that suit your requirements."
              },
              {
                number: "03",
                title: "Make it happen",
                description: "Bring all the pieces together and create an occasion worth remembering."
              }
            ].map((step) => (
              <div key={step.number} className="border-t border-[#B9CEBD] pt-6">
                <p className="text-4xl font-light text-[#91AA94]">
                  {step.number}
                </p>

                <h3 className="mt-5 text-xl font-semibold text-[#185744]">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-[#78837A]">
                  {step.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* VENDOR SECTION */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl bg-[#185744] md:grid-cols-2">

          <div className="p-9 text-white md:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B9CEBD]">
              FOR EVENT PROFESSIONALS
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight">
              Your expertise deserves to be discovered.
            </h2>

            <p className="mt-5 leading-7 text-[#DCE9DF]">
              Are you an event professional or business owner?
              Join MeetCraft and connect with people looking
              for the services you provide.
            </p>

            <Link
              to="/signup"
              className="mt-8 inline-block rounded-lg bg-[#F5F8F3] px-7 py-3.5 font-semibold text-[#185744] transition hover:-translate-y-1 hover:bg-white"
            >
              Join as a Vendor →
            </Link>
          </div>

          <div className="min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200"
              alt="Beautifully arranged event venue"
              className="h-full min-h-[300px] w-full object-cover"
            />
          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="bg-white px-6 py-20 text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#57816A]">
          THE MOMENT STARTS HERE
        </p>

        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-tight text-[#185744] md:text-5xl">
          Have something special in mind?
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-[#78837A]">
          Let's turn your ideas into experiences that
          people will remember.
        </p>

        <Link
          to="/signup"
          className="mt-8 inline-block rounded-lg bg-[#185744] px-9 py-4 font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg"
        >
          Get Started with MeetCraft →
        </Link>

      </section>


      {/* FOOTER */}
      <footer className="bg-[#173F34] px-6 py-10 text-white">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <h2 className="text-2xl font-bold">MeetCraft</h2>
            <p className="mt-2 text-sm text-[#B9CEBD]">
              Make every moment special.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-[#DCE9DF]">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <Link to="/login" className="transition hover:text-white">Login</Link>
            <Link to="/signup" className="transition hover:text-white">Sign Up</Link>
          </div>

        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/20 pt-6 text-xs text-[#B9CEBD]">
          © {new Date().getFullYear()} MeetCraft. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;
