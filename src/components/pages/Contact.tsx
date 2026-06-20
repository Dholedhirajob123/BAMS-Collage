// components/pages/Contact.tsx
import { useState } from "react";
import campus1 from "@/assets/campus-1.jpg";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We will get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
  

      {/* Contact Info and Form Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Contact Information */}
        <div className="space-y-6">
          <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <span className="text-xl">📍</span>
              </div>
              <h3 className="font-semibold text-brand">College Address</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha's<br />
              Rajashri Ayurvedic Medical College & Hospital<br />
              Cotton Market Road, Mehkar, Tq. Mehkar, Dist. Buldhana – 443301<br />
              Maharashtra, India
            </p>
          </div>
          
          <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-xl">📞</span>
              </div>
              <h3 className="font-semibold text-brand">Reach Us</h3>
            </div>
            <ul className="text-sm space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-brand">📞</span>
                <div>
                  <strong>Office:</strong> +91 - 8087203870 | 8087303870
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand">✉️</span>
                <div>
                  <strong>Email:</strong> 
                  <a className="text-brand hover:underline block" href="mailto:rajshreeayurvedic@gmail.com">
                    rajshreeayurvedic@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border rounded-xl p-4 bg-secondary/30 text-center">
              <div className="text-2xl mb-1">🕐</div>
              <div className="text-sm font-semibold text-brand">Office Hours</div>
              <div className="text-xs text-muted-foreground">Mon–Sat · 9:00 AM – 5:00 PM</div>
            </div>
            <div className="border border-border rounded-xl p-4 bg-secondary/30 text-center">
              <div className="text-2xl mb-1">🚨</div>
              <div className="text-sm font-semibold text-brand">Emergency</div>
              <div className="text-xs text-muted-foreground">24 × 7 Hospital Services</div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="border border-border rounded-xl bg-card p-6 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-brand">Send us a Message</h3>
            <p className="text-sm text-muted-foreground mt-1">We'd love to hear from you. Fill out the form and we'll respond promptly.</p>
          </div>

          {submitStatus && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-brand/50"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-brand/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, phone: numericValue });
                  }}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-brand/50"
                  placeholder="Enter 10 digit mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Subject *</label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-brand/50"
                >
                  <option value="">Select subject</option>
                  <option value="Admission Inquiry">Admission Inquiry</option>
                  <option value="Course Information">Course Information</option>
                  <option value="Hospital Services">Hospital Services</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand text-white py-3 px-4 rounded-md hover:bg-brand/80 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>We respect your privacy. Your information will not be shared with third parties.</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="rounded-xl overflow-hidden border border-border shadow-sm">
        <iframe
          title="Mehkar location"
          src="https://www.google.com/maps?q=Mehkar,Buldhana,Maharashtra&output=embed"
          className="w-full h-80"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Contact;