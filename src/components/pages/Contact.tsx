// components/pages/Contact.tsx
import { useState } from "react";
import emailjs from "@emailjs/browser";

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
      await emailjs.send(
        "service_9u4f0ko",
        "template_wqqhiax",
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        "XvIwjTzdEnLR1kmbW"
      );

      setSubmitStatus({
        type: "success",
        message: "Thank you for contacting Rajashri Ayurvedic Medical College & Hospital. We have received your message and will contact you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);

      setSubmitStatus({
        type: "error",
        message: "Unable to send your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Contact Info and Form Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Contact Information */}
        <div className="space-y-6">
          {/* College Address */}
          <div className="border-2 border-red-300 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-xl">📍</span>
              </div>
              <h3 className="font-bold text-black">College Address</h3>
            </div>
            <p className="text-sm text-black font-bold leading-relaxed">
              Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha's<br />
              Rajashri Ayurvedic Medical College & Hospital<br />
              Cotton Market Road, Mehkar, Tq. Mehkar, Dist. Buldhana – 443301<br />
              Maharashtra, India
            </p>
          </div>
          
          {/* Reach Us */}
          <div className="border-2 border-red-300 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-xl">📞</span>
              </div>
              <h3 className="font-bold text-black">Reach Us</h3>
            </div>
            <ul className="text-sm space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-red-600">📞</span>
                <div className="text-black font-bold">
                  <strong>Office:</strong> +91 - 8087203870 | 8087303870
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600">✉️</span>
                <div className="break-all">
                  <strong className="text-black font-bold">Email:</strong>
                  <a
                    href="mailto:rajshreeayurvedic@gmail.com"
                    className="block text-red-600 hover:underline font-bold"
                  >
                    rajshreeayurvedic@gmail.com
                  </a>
                  <a
                    href="mailto:2024rajashriayu0870@gmail.com"
                    className="block text-red-600 hover:underline font-bold"
                  >
                    2024rajashriayu0870@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-red-300 rounded-2xl p-4 bg-white text-center hover:shadow-lg transition-all">
              <div className="text-2xl mb-1">🕐</div>
              <div className="text-sm font-bold text-black">Office Hours</div>
              <div className="text-xs text-black font-bold">Mon–Sat · 9:00 AM – 5:00 PM</div>
            </div>
            <div className="border-2 border-red-300 rounded-2xl p-4 bg-white text-center hover:shadow-lg transition-all">
              <div className="text-2xl mb-1">🚨</div>
              <div className="text-sm font-bold text-black">Emergency</div>
              <div className="text-xs text-black font-bold">24 × 7 Hospital Services</div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="border-2 border-red-300 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-black">Send us a Message</h3>
            <p className="text-sm text-black font-bold mt-1">We'd love to hear from you. Fill out the form and we'll respond promptly.</p>
          </div>

          {submitStatus && (
            <div className={`mb-4 p-3 rounded-xl text-sm font-bold ${
              submitStatus.type === 'success' 
                ? 'bg-green-50 text-green-800 border-2 border-green-300' 
                : 'bg-red-50 text-red-800 border-2 border-red-300'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-red-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-red-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, phone: numericValue });
                  }}
                  className="w-full px-3 py-2 border-2 border-red-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  placeholder="Enter 10 digit mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">Subject *</label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-red-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
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
              <label className="block text-sm font-bold text-black mb-1">Message *</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-red-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message →'}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-black font-bold">
            <p>We respect your privacy. Your information will not be shared with third parties.</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="rounded-2xl overflow-hidden border-2 border-red-300 shadow-sm hover:shadow-lg transition-all">
        <iframe
          title="Rajashri Ayurvedic Medical College & Hospital"
          src="https://www.google.com/maps?q=20.140333,76.567278&z=16&output=embed"
          className="w-full h-[250px] sm:h-[350px] md:h-[450px]"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default Contact;