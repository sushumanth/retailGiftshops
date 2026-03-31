import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';

export function BeautifulSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headlineX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-600, 0, 0, -300]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardAX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [500, 0, 0, 300]);
  const cardARotate = useTransform(scrollYProgress, [0, 0.3], [-20, 0]);
  const cardBX = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 1], [500, 0, 0, 300]);
  const cardBRotate = useTransform(scrollYProgress, [0.1, 0.35], [-20, 0]);
  const cardCY = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 1], [400, 0, 0, 200]);
  const cardCRotate = useTransform(scrollYProgress, [0.15, 0.4], [12, 0]);

  const productA = products[13]; // Dried Bouquet
  const productB = products[14]; // Ceramic Tray
  const productC = products[15]; // Mini Notebook

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F6F6F2] relative overflow-hidden z-[70]"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-lavender pointer-events-none opacity-70" />

      {/* Decorative Elements */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute right-[15vw] top-[10vh] decorative-ring w-28 h-28 opacity-20"
      />
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute left-[28vw] bottom-[18vh] w-4 h-4 rounded-full bg-[#a890ff]/40"
      />
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute right-[25vw] bottom-[12vh] w-3 h-3 rounded-full bg-[#F2C94C]/40"
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
                className="heading-display text-[clamp(36px,5.5vw,90px)] text-[#111]"
              >
                BEAUTIFUL
                <br />
                THINGS
              </motion.h2>

              {/* Body */}
              <motion.p
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[clamp(14px,1.2vw,18px)] text-[#6F6F6F] mt-6 max-w-md leading-relaxed"
              >
                A handpicked lookbook of objects that feel like little luxuries.
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
                  to="/products"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Open the Lookbook
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Product Cards */}
            <div className="relative h-full min-h-[600px]">
              {/* Card A - Top Right */}
              <motion.div
                style={{ x: cardAX, rotateY: cardARotate }}
                className="absolute right-0 top-[5vh]"
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

              {/* Card C - Center Right (between A & B) */}
              <motion.div
                style={{ y: cardCY, rotateX: cardCRotate }}
                className="absolute right-[28vw] top-[28vh]"
              >
                <ProductCard product={productC} size="small" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
