import React, { useState } from "react";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground";
import "./Contact.css";

const FAQS = [
  { q: "How do I enrol my child?", a: "Simply choose a class, pick a subscription plan, and create your child's account. You can start with free lessons immediately." },
  { q: "Can I access content on mobile?", a: "Yes! Dr Mom 2.0 is fully responsive and works on smartphones, tablets, and desktop computers." },
  { q: "What is the refund policy?", a: "We offer a 7-day money-back guarantee. If you are not satisfied, contact us and we will process your refund promptly." },
  { q: "How many devices can I use?", a: "A single subscription allows access from up to 3 devices simultaneously." },
  { q: "Are the lessons aligned to NCERT?", a: "Yes. All content from Grade 1 onwards is aligned to the NCERT curriculum framework." },
];

const CONTACT_INFO = [
  { icon: "📍", label: "Address", value: "14, Rajiv Gandhi Salai, Perungudi, Chennai – 600 096" },
  { icon: "📞", label: "Phone", value: "+91 98765 43210" },
  { icon: "✉️", label: "Email", value: "hello@doctormom.in" },
  { icon: "🕘", label: "Hours", value: "Mon–Sat, 9 AM – 7 PM IST" },
];

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.5 6.2c-.2-.9-.9-1.6-1.8-1.8C19.4 4 12 4 12 4s-7.4 0-9.7.4A2.1 2.1 0 0 0 .5 6.2 21.8 21.8 0 0 0 0 12a21.8 21.8 0 0 0 .5 5.8 2.1 2.1 0 0 0 1.8 1.8c2.3.4 9.7.4 9.7.4s7.4 0 9.7-.4a2.1 2.1 0 0 0 1.8-1.8A21.8 21.8 0 0 0 24 12a21.8 21.8 0 0 0-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm8 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-5 1A4 4 0 008 9.5 4 4 0 0012 13.5 4 4 0 0016 9.5 4 4 0 0012 6.5zm0 2a2 2 0 110 4 2 2 0 010-4z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.46 6c-.77.34-1.6.56-2.46.66a4.27 4.27 0 001.88-2.35 8.49 8.49 0 01-2.7 1.03 4.24 4.24 0 00-7.2 3.86A12.03 12.03 0 013 5.16a4.24 4.24 0 001.31 5.65 4.21 4.21 0 01-1.92-.53v.05a4.24 4.24 0 003.4 4.16 4.26 4.26 0 01-1.91.07 4.24 4.24 0 003.96 2.95A8.5 8.5 0 012 19.54a12.04 12.04 0 006.52 1.91c7.83 0 12.12-6.49 12.12-12.12 0-.18 0-.35-.01-.53A8.65 8.65 0 0024 6.64a8.35 8.35 0 01-2.4.66 4.22 4.22 0 001.84-2.33" />
      </svg>
    ),
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend
    setSubmitted(true);
  };

  return (
    <div className="contact-page page-wrapper">
      <ParticleBackground density={40} />

      {/* Hero */}
      <section className="contact-hero section">
        <div className="contact-hero__orb" aria-hidden="true" />
        <div className="container">
          <div className="tag anim-fadeInUp">📬 Contact Us</div>
          <h1 className="section-title anim-fadeInUp delay-1">
            We'd Love to <span className="gradient-text">Hear from You</span>
          </h1>
          <div className="divider anim-fadeInUp delay-2" />
          <p className="section-subtitle anim-fadeInUp delay-2">
            Questions, feedback, or just want to say hello? Our team is ready to help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section contact-main">
        <div className="container contact-main__grid">

          {/* Contact Info */}
          <div className="contact-info">
            <h2 className="contact-info__title">Get in Touch</h2>
            <p className="contact-info__desc">
              Our support team is available Monday to Saturday to assist you
              with anything related to your child's learning journey.
            </p>
            <div className="contact-info__cards">
              {CONTACT_INFO.map(({ icon, label, value }) => (
                <div key={label} className="contact-info-card glass-panel">
                  <span className="contact-info-card__icon">{icon}</span>
                  <div>
                    <p className="contact-info-card__label">{label}</p>
                    <p className="contact-info-card__value">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="contact-social">
              <p className="contact-social__title">Follow Us</p>
              <div className="contact-social__links">
                {SOCIAL_LINKS.map(({ label, icon }) => (
                  <a key={label} href="#!" className="contact-social__link" aria-label={label}>
                    <span>{icon}</span>
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap glass-panel">
            {submitted ? (
              <div className="contact-success">
                <span className="contact-success__icon">🎉</span>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="contact-form__title">Send a Message</h2>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="Your name"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email" name="email" type="email" required
                      placeholder="your@email.com"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone" name="phone" type="tel"
                      placeholder="+91 ..."
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject" name="subject" required
                      value={form.subject} onChange={handleChange}
                    >
                      <option value="">Select topic</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing & Subscriptions</option>
                      <option value="content">Content Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="contact-form__field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    placeholder="How can we help you?"
                    value={form.message} onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary contact-form__submit">
                  Send Message ✉️
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section contact-faq">
        <div className="contact-faq__bg" aria-hidden="true" />
        <div className="container">
          <div className="contact-faq__header">
            <div className="tag">❓ FAQ</div>
            <h2 className="section-title">
              Frequently Asked <span className="gradient-text-purple">Questions</span>
            </h2>
            <div className="divider" />
          </div>
          <div className="faq-list">
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                className={`faq-item glass-panel ${openFaq === i ? "faq-item--open" : ""}`}
              >
                <button
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{q}</span>
                  <span className="faq-item__chevron">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="faq-item__answer">{a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
