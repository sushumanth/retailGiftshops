import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';

export function ArrivalsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headlineX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-600, 0, 0, -300]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardAX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [600, 0, 0, 300]);
  const cardARotate = useTransform(scrollYProgress, [0, 0.3], [-25, 0]);
  const cardBY = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 1], [600, 0, 0, 200]);
  const cardBRotate = useTransform(scrollYProgress, [0.1, 0.4], [15, 0]);

  const productA = products[9]; // Potted Succulent
  const productB = products[10]; // Washi Tape Set

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F6F6F2] relative overflow-hidden z-50"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-peach pointer-events-none" />

      {/* Decorative Elements */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute left-[32vw] top-[14vh] w-3 h-3 rounded-full bg-[#ffa07a]/40"
      />
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute right-[18vw] top-[22vh] decorative-ring w-20 h-20 opacity-20"
      />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-6 lg:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div style={{ opacity: contentOpacity }}>
              {/* Headline */}
              <motion.h2
                style={{ x: headlineX }}
                className="heading-display text-[clamp(52px,8vw,120px)] text-[#111]"
              >
                ARRIVALS
              </motion.h2>

              {/* Body */}
              <motion.p
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[clamp(14px,1.2vw,18px)] text-[#6F6F6F] mt-6 max-w-md leading-relaxed"
              >
                Handpicked, limited stock, and ready to gift.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link
                  to="/products?category=new-arrivals"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Shop Arrivals
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Product Cards */}
            <div className="relative h-full min-h-[500px]">
              {/* Card A - Medium, Right-mid */}
              <motion.div
                style={{ x: cardAX, rotateY: cardARotate }}
                className="absolute right-0 top-[10vh]"
              >
                <ProductCard product={productA} size="medium" />
              </motion.div>

              {/* Card B - Small, Lower-left */}
              <motion.div
                style={{ y: cardBY, rotateX: cardBRotate }}
                className="absolute left-0 bottom-[5vh]"
              >
                <ProductCard product={productB} size="small" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
