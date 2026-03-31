import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send, Instagram, MessageCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen bg-[#F6F6F2] pt-24 pb-16">
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="label-accent text-[#F2C94C] mb-4 block">GET IN TOUCH</span>
          <h1 className="heading-display text-[clamp(40px,6vw,80px)] text-[#111] mb-6">
            CONTACT US
          </h1>
          <p className="text-[#6F6F6F] leading-relaxed">
            Have a question or need help finding the perfect gift? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: MapPin,
              title: 'Visit Us',
              content: '12 Bazaar Street, Nellore, AP — 524001',
              action: { label: 'Get Directions', href: 'https://maps.google.com' },
            },
            {
              icon: Phone,
              title: 'Call Us',
              content: '+91 98765 43210',
              action: { label: 'Call Now', href: 'tel:+919876543210' },
            },
            {
              icon: Mail,
              title: 'Email Us',
              content: 'hello@goodthings.com',
              action: { label: 'Send Email', href: 'mailto:hello@goodthings.com' },
            },
            {
              icon: Clock,
              title: 'Opening Hours',
              content: 'Daily: 10:00 AM – 9:00 PM',
              action: null,
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-[28px] p-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#F2C94C]/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-[#F2C94C]" />
              </div>
              <h3 className="font-bold text-[#111] mb-2">{item.title}</h3>
              <p className="text-[#6F6F6F] text-sm mb-4">{item.content}</p>
              {item.action && (
                <a
                  href={item.action.href}
                  target={item.action.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="label-accent text-[#F2C94C] hover:text-[#111] transition-colors"
                >
                  {item.action.label}
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-[28px] p-8 lg:p-10">
              <h2 className="heading-display text-2xl text-[#111] mb-6">
                SEND US A MESSAGE
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F2C94C]/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-[#F2C94C]" />
                  </div>
                  <h3 className="font-bold text-xl text-[#111] mb-2">Message Sent!</h3>
                  <p className="text-[#6F6F6F] mb-6">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="label-accent text-[#6F6F6F] mb-2 block">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F6F6F2] rounded-xl border border-transparent focus:border-[#F2C94C] focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="label-accent text-[#6F6F6F] mb-2 block">
                        YOUR EMAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F6F6F2] rounded-xl border border-transparent focus:border-[#F2C94C] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-accent text-[#6F6F6F] mb-2 block">
                      SUBJECT
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#F6F6F2] rounded-xl border border-transparent focus:border-[#F2C94C] focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="custom">Custom Gift Request</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="label-accent text-[#6F6F6F] mb-2 block">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#F6F6F2] rounded-xl border border-transparent focus:border-[#F2C94C] focus:outline-none transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#111] border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Map & Social */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Map */}
            <div className="aspect-video bg-[#1a1a1a] rounded-[28px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.452345!2d79.9865!3d14.4426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDI2JzMzLjQiTiA3OcKwNTknMTEuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Good Things Location"
              />
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-[28px] p-6">
              <h3 className="font-bold text-[#111] mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#F6F6F2] flex items-center justify-center hover:bg-[#F2C94C] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#F6F6F2] flex items-center justify-center hover:bg-[#F2C94C] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
