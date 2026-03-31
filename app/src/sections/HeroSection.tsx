import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineX = useTransform(scrollYProgress, [0, 0.5], [0, -400]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const cardRotateY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const decorY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const featuredProduct = products[0];

  return (
    <section
      ref={sectionRef}
      className="w-screen min-h-[100svh] md:h-screen bg-[#F6F6F2] relative overflow-hidden"
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
        className="absolute right-[28vw] top-[14vh] decorative-ring w-24 h-24 opacity-30 hidden md:block"
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
      <div className="relative min-h-[100svh] md:h-full flex items-start md:items-center pt-24 pb-10 md:py-0">
        <div className="w-full px-4 sm:px-6 lg:px-[6vw]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7 md:gap-8">
            {/* Left Content */}
            <motion.div
              style={isMobile ? { opacity: headlineOpacity } : { x: headlineX, opacity: headlineOpacity }}
              className="flex-1 max-w-xl w-full"
            >
              {/* Headline */}
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="heading-display hero-title-tone leading-[0.88] text-[clamp(56px,21vw,120px)] lg:text-[clamp(62px,10vw,140px)]"
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
                className="text-[clamp(14px,4.3vw,22px)] text-[#6F6F6F] mt-4 md:mt-6"
              >
                Gifts, fancy & everyday joy.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4 mt-6 md:mt-8 w-full sm:w-auto"
              >
                <Link to="/products" className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
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
              style={isMobile ? undefined : { rotateY: cardRotateY }}
              className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-end"
            >
              <ProductCard product={featuredProduct} size={isMobile ? 'medium' : 'large'} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
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
