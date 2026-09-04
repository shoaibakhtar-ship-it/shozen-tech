import SEO from "../components/common/SEO";
function TermsAndConditions() {
  return (
    <div className="bg-white text-[#111111]">
      <SEO
        title="Terms &amp; Conditions | SHOZEN TECH"
        description="Read the SHOZEN TECH Terms and Conditions covering website use, services, project enquiries, intellectual property and third-party services."
        path="/terms-and-conditions"
      />
      <section className="bg-[#f2f2f2]">
        <div className="mx-auto max-w-[1100px] px-6 py-20 md:px-10 md:py-28">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#ef0038]">
            Legal
          </p>

          <h1 className="mt-4 text-[46px] font-semibold tracking-[-0.055em] sm:text-[58px] md:text-[68px]">
            Terms &{" "}
            <span className="text-[#ef0038]">
              Conditions
            </span>
          </h1>

          <p className="mt-6 max-w-[720px] text-[15px] leading-7 text-black/55">
            These terms describe the general conditions
            for using the SHOZEN TECH website and
            engaging with our digital services.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold">
                Website Use
              </h2>

              <p className="mt-4 leading-8 text-black/60">
                By using this website, you agree to use
                it only for lawful purposes and in a
                manner that does not interfere with the
                operation or security of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                Project Enquiries
              </h2>

              <p className="mt-4 leading-8 text-black/60">
                Submitting an enquiry through the
                website does not automatically create a
                contract or guarantee acceptance of a
                project. Project scope, pricing,
                timelines and deliverables are agreed
                separately before work begins.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                Services
              </h2>

              <p className="mt-4 leading-8 text-black/60">
                SHOZEN TECH may provide website
                development, software development,
                UI/UX design, AI solutions, automation,
                API development and related digital
                services depending on project
                requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                Intellectual Property
              </h2>

              <p className="mt-4 leading-8 text-black/60">
                Website content, branding and original
                materials belonging to SHOZEN TECH may
                not be copied, reproduced or distributed
                without permission, except where
                otherwise agreed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                Third-Party Services
              </h2>

              <p className="mt-4 leading-8 text-black/60">
                Some projects may depend on third-party
                platforms, APIs, hosting providers or
                other external services. Their
                availability and policies may be outside
                the direct control of SHOZEN TECH.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                Limitation of Liability
              </h2>

              <p className="mt-4 leading-8 text-black/60">
                SHOZEN TECH aims to provide reliable
                services, but cannot guarantee that all
                website or third-party services will
                always operate without interruption,
                delay or technical issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                Changes to These Terms
              </h2>

              <p className="mt-4 leading-8 text-black/60">
                These Terms & Conditions may be updated
                as our services and business practices
                evolve.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                Contact
              </h2>

              <p className="mt-4 leading-8 text-black/60">
                For questions regarding these terms,
                contact SHOZEN TECH at{" "}
                <a
                  href="mailto:shozentech@gmail.com"
                  className="font-medium text-[#ef0038]"
                >
                  shozentech@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TermsAndConditions;