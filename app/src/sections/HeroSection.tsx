import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineX = useTransform(scrollYProgress, [0, 0.5], [0, -400]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const cardX = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
  const cardRotateY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const decorY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const featuredProduct = products[0];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F6F6F2] relative overflow-hidden"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-lavender pointer-events-none" />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.03) 100%)'
        }}
      />

      {/* Decorative Elements */}
      <motion.div
        style={{ y: decorY }}
        className="absolute right-[28vw] top-[14vh] decorative-ring w-24 h-24 opacity-30"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute right-[22vw] bottom-[20vh] w-4 h-4 rounded-full bg-[#F2C94C]/40"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute left-[40vw] top-[18vh] w-3 h-3 rounded-full bg-[#a890ff]/40"
      />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-6 lg:px-[6vw]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <motion.div
              style={{ x: headlineX, opacity: headlineOpacity }}
              className="flex-1 max-w-xl"
            >
              {/* Headline */}
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="heading-display hero-title-tone text-[clamp(48px,10vw,140px)]"
              >
                GOOD
                <br />
                THINGS
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[clamp(16px,1.6vw,22px)] text-[#6F6F6F] mt-6"
              >
                Gifts, fancy & everyday joy.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4 mt-8"
              >
                <Link to="/products" className="btn-primary flex items-center gap-2">
                  Shop New Arrivals
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/products" className="label-accent text-[#111] hover:text-[#F2C94C] transition-colors flex items-center gap-2">
                  View Collections
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Featured Product Card */}
            <motion.div
              initial={{ x: 100, rotateY: 20, opacity: 0 }}
              animate={{ x: 0, rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: cardX, rotateY: cardRotateY }}
              className="flex-shrink-0"
            >
              <ProductCard product={featuredProduct} size="large" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        {/* <span className="label-accent text-[#6F6F6F] text-xs">Scroll</span> */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-[#6F6F6F]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
