import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Send, ArrowUpRight } from 'lucide-react';
import { ContactBackground3D } from '@/components/ContactBackground3D';

const instagramImages = [
  '/images/instagram_01.jpg',
  '/images/instagram_02.jpg',
  '/images/instagram_03.jpg',
  '/images/instagram_04.jpg',
  '/images/instagram_05.jpg',
  '/images/instagram_06.jpg',
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.3], [24, 0]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeMessage('');

    await new Promise((resolve) => setTimeout(resolve, 700));

    setIsSubscribing(false);
    setSubscribeMessage('Thanks! You are on the list for new drops.');
    setEmail('');

    setTimeout(() => {
      setSubscribeMessage('');
    }, 3500);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#F6F6F2] to-[#FFFBF5] relative overflow-hidden z-[80]"
    >
      <ContactBackground3D />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.78),transparent_42%),radial-gradient(circle_at_82%_76%,rgba(255,255,255,0.55),transparent_45%)] pointer-events-none" />

      {/* Main Contact Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 px-6 lg:px-[6vw] py-20 lg:py-32"
      >
        {/* Headline */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="heading-display text-[clamp(40px,6vw,96px)] text-[#111] mb-6"
        >
          VISIT US
        </motion.h2>
        <p className="text-[#6F6F6F] text-lg mb-16 max-w-2xl">
          Drop by our store for a personalized experience and to discover our curated collection in person.
        </p>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Store Details */}
          <div className="space-y-8">
            {/* Address */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-white/95 border border-white/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow backdrop-blur-[2px]"
            >
              <div className="w-12 h-12 rounded-full bg-[#F2C94C]/15 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#F2C94C]" />
              </div>
              <div>
                <h3 className="label-accent text-[#111] mb-2 font-semibold">ADDRESS</h3>
                <p className="text-[#6F6F6F] text-base leading-relaxed font-medium">
                  Good Things<br />
                  12 Bazaar Street<br />
                  Nellore, Andhra Pradesh — 524001
                </p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-white/95 border border-white/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow backdrop-blur-[2px]"
            >
              <div className="w-12 h-12 rounded-full bg-[#F2C94C]/15 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#F2C94C]" />
              </div>
              <div>
                <h3 className="label-accent text-[#111] mb-2 font-semibold">HOURS</h3>
                <p className="text-[#6F6F6F] text-base font-medium">
                  Open daily: 10:00 AM – 9:00 PM
                </p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-white/95 border border-white/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow backdrop-blur-[2px]"
            >
              <div className="w-12 h-12 rounded-full bg-[#F2C94C]/15 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#F2C94C]" />
              </div>
              <div>
                <h3 className="label-accent text-[#111] mb-2 font-semibold">CONTACT</h3>
                <p className="text-[#6F6F6F] text-base font-medium">
                  +91 98765 43210
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 pt-4"
            >
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F2C94C] text-[#111] rounded-full font-semibold hover:bg-[#e5bc3c] transition-colors shadow-sm hover:shadow-md"
              >
                Get Directions
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#111] text-[#111] rounded-full font-semibold hover:bg-[#111] hover:text-[#F6F6F2] transition-colors"
              >
                WhatsApp Us
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#111] text-[#111] rounded-full font-semibold hover:bg-[#111] hover:text-[#F6F6F2] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram DM
              </a>
            </motion.div>
          </div>

          {/* Right Column - Map & Newsletter */}
          <div className="space-y-8">
            {/* Map Placeholder */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="aspect-video bg-white/95 border border-white/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow backdrop-blur-[2px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.452345!2d79.9865!3d14.4426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDI2JzMzLjQiTiA3OcKwNTknMTEuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Good Things Location"
              />
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/95 border border-white/80 p-6 rounded-2xl shadow-sm backdrop-blur-[2px]"
            >
              <h3 className="label-accent text-[#111] mb-2 font-semibold">
                JOIN THE LIST FOR DROPS & DEALS
              </h3>
              <p className="text-[#6F6F6F] text-sm mb-4">Get updates on our latest collections.</p>
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 bg-[#F6F6F2] border border-[#DDD] rounded-full text-[#111] placeholder:text-[#999] focus:outline-none focus:border-[#F2C94C] transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3 bg-[#F2C94C] text-[#111] rounded-full font-semibold hover:bg-[#e5bc3c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {subscribeMessage && (
                <p className="mt-3 text-sm text-[#2E7D32] font-medium">{subscribeMessage}</p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Instagram Gallery */}
      <div className="px-6 lg:px-[6vw] py-12 border-t border-[#DDD]">
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="label-accent text-[#111] mb-6 font-semibold"
        >
          FOLLOW US ON INSTAGRAM @GOODTHINGS.NELLORE
        </motion.h3>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramImages.map((image, index) => (
            <motion.a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={image}
                alt={`Instagram ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
              />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 lg:px-[6vw] py-8 border-t border-[#DDD] bg-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Shipping & Returns', 'FAQ', 'Privacy', 'Terms'].map((link) => (
              <a
                key={link}
                href="#"
                className="label-accent text-[#6F6F6F] hover:text-[#111] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[#6F6F6F] text-sm">
            © 2024 Good Things. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
