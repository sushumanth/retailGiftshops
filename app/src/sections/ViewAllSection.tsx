import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';

export function ViewAllSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const contentX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-400, 0, 0, -200]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardAX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [500, 0, 0, 200]);
  const cardARotate = useTransform(scrollYProgress, [0, 0.3], [-20, 0]);
  const cardBX = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 1], [500, 0, 0, 200]);
  const cardBRotate = useTransform(scrollYProgress, [0.1, 0.4], [-20, 0]);

  const productA = products[11]; // Gift Wrap Service
  const productB = products[12]; // Gift Card

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F6F6F2] relative overflow-hidden z-[60]"
    >
      {/* Vignette only - no gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.02) 100%)'
        }}
      />

      {/* Decorative Elements */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute right-[8vw] top-[12vh] decorative-ring w-24 h-24 opacity-20"
      />
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute left-[35vw] bottom-[15vh] w-4 h-4 rounded-full bg-[#F2C94C]/40"
      />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-6 lg:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div style={{ x: contentX, opacity: contentOpacity }}>
              {/* Headline */}
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="heading-display text-[clamp(48px,7vw,110px)] text-[#111]"
              >
                VIEW ALL
              </motion.h2>

              {/* Body */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-[clamp(14px,1.2vw,18px)] text-[#6F6F6F] mt-6 max-w-md leading-relaxed"
              >
                Explore the full collection.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-start gap-4 mt-8"
              >
                <Link
                  to="/products"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  View All Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="label-accent text-[#111] hover:text-[#F2C94C] transition-colors flex items-center gap-2"
                >
                  Request a Custom Gift Box
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Product Cards */}
            <div className="relative h-full min-h-[500px]">
              {/* Card A - Top Right */}
              <motion.div
                style={{ x: cardAX, rotateY: cardARotate }}
                className="absolute right-0 top-[8vh]"
              >
                <ProductCard product={productA} size="medium" />
              </motion.div>

              {/* Card B - Lower Right */}
              <motion.div
                style={{ x: cardBX, rotateY: cardBRotate }}
                className="absolute right-0 bottom-[5vh]"
              >
                <ProductCard product={productB} size="medium" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
