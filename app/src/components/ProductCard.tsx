import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  size?: 'small' | 'medium' | 'large';
  showQuickActions?: boolean;
}

export function ProductCard({
  product,
  size = 'medium',
  showQuickActions = true,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const [isLiked, setIsLiked] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizeClasses = {
    small: 'w-[22vw] min-w-[200px] h-[26vh] min-h-[200px]',
    medium: 'w-[26vw] min-w-[240px] h-[44vh] min-h-[360px]',
    large: 'w-[34vw] min-w-[300px] h-[56vh] min-h-[450px]',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`product-card ${sizeClasses[size]} relative group cursor-pointer`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative h-[72%] overflow-hidden rounded-[22px] m-3">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ transform: 'translateZ(20px)' }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Tag */}
        {product.tag && (
          <div
            className={`absolute top-3 left-3 label-accent px-3 py-1.5 rounded-full text-white ${
              product.tag === 'NEW'
                ? 'bg-[#F2C94C] text-[#111]'
                : product.tag === 'BESTSELLER'
                ? 'bg-[#111]'
                : 'bg-[#e74c3c]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick Actions */}
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                addItem(product);
              }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#F2C94C] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pb-4" style={{ transform: 'translateZ(30px)' }}>
        <h3 className="font-semibold text-[#111] text-sm truncate">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[#F2C94C] font-bold">
            {product.price === 0 ? 'Any amount' : `₹${product.price.toLocaleString()}`}
          </p>
          {product.originalPrice && (
            <p className="text-[#6F6F6F] line-through text-sm">
              ₹{product.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
