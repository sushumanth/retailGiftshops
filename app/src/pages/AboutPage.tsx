import { motion } from 'framer-motion';
import { Heart, Gift, Sparkles, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Curated with Care',
    description: 'Every item in our collection is handpicked with love and attention to detail.',
  },
  {
    icon: Gift,
    title: 'Perfect for Gifting',
    description: 'From birthdays to just-because moments, we have something for every occasion.',
  },
  {
    icon: Sparkles,
    title: 'Quality First',
    description: 'We partner with artisans and brands who share our commitment to excellence.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Proudly serving Nellore with personalized service and local charm.',
  },
];

const stats = [
  { value: '5+', label: 'Years of Service' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '50+', label: 'Brand Partners' },
];

export function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F6F6F2] pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-6 lg:px-[6vw] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="label-accent text-[#F2C94C] mb-4 block"
          >
            OUR STORY
          </motion.span>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-display text-[clamp(40px,6vw,80px)] text-[#111] mb-8"
          >
            GOOD THINGS
            <br />
            <span className="text-[#6F6F6F]">FOR GOOD PEOPLE</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[clamp(16px,1.4vw,20px)] text-[#6F6F6F] leading-relaxed max-w-2xl mx-auto"
          >
            Founded in 2019 in the heart of Nellore, Good Things began with a simple mission: 
            to bring joy through thoughtfully curated gifts and beautiful everyday items. 
            What started as a small boutique has grown into a beloved destination for those 
            seeking something special.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 lg:px-[6vw] py-12">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="heading-display text-[clamp(36px,5vw,64px)] text-[#F2C94C]">
                {stat.value}
              </span>
              <p className="label-accent text-[#6F6F6F] mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="px-6 lg:px-[6vw] py-16 lg:py-24">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-display text-[clamp(32px,4vw,56px)] text-[#111] mb-4">
            OUR VALUES
          </h2>
          <p className="text-[#6F6F6F] max-w-xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[28px] p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-[#F2C94C]/10 flex items-center justify-center mx-auto mb-6">
                <value.icon className="w-8 h-8 text-[#F2C94C]" />
              </div>
              <h3 className="font-bold text-lg text-[#111] mb-3">{value.title}</h3>
              <p className="text-[#6F6F6F] text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 lg:px-[6vw] py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/instagram_03.jpg"
              alt="Good Things Store"
              className="rounded-[28px] shadow-xl w-full aspect-[4/3] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="label-accent text-[#F2C94C] mb-4 block">THE JOURNEY</span>
            <h2 className="heading-display text-[clamp(28px,3.5vw,48px)] text-[#111] mb-6">
              FROM A DREAM TO YOUR DOORSTEP
            </h2>
            <div className="space-y-4 text-[#6F6F6F] leading-relaxed">
              <p>
                It all began when our founder, inspired by her love for beautiful things and 
                meaningful gifting, decided to create a space where people could find curated 
                items that bring joy to everyday life.
              </p>
              <p>
                Starting with just a small corner shop on Bazaar Street, Good Things quickly 
                became known for its unique selection of gifts, home decor, and lifestyle 
                products. Today, we're proud to be Nellore's go-to destination for those 
                seeking something special.
              </p>
              <p>
                Every product in our store is carefully selected, ensuring quality, 
                uniqueness, and that special something that makes gift-giving truly memorable.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team/Community Section */}
      <section className="px-6 lg:px-[6vw] py-16 lg:py-24 bg-white rounded-t-[48px]">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="label-accent text-[#F2C94C] mb-4 block">VISIT US</span>
          <h2 className="heading-display text-[clamp(28px,3.5vw,48px)] text-[#111] mb-6">
            COME SAY HELLO
          </h2>
          <p className="text-[#6F6F6F] leading-relaxed mb-8">
            We'd love to meet you! Visit our store on Bazaar Street to explore our collection 
            in person, get personalized gift recommendations, and experience the Good Things 
            difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="btn-primary">
              Get Directions
            </a>
            <a href="/products" className="btn-secondary">
              Shop Online
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
