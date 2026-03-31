import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { getProductById, products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { ProductCard } from '@/components/ProductCard';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F6F6F2] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-display text-3xl text-[#111] mb-4">Product Not Found</h1>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F6F2] pt-24 pb-16">
      <div className="px-6 lg:px-[6vw]">
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6F6F6F] hover:text-[#111] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="label-accent">Back</span>
        </motion.button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-[28px] overflow-hidden bg-white shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.tag && (
              <div
                className={`absolute top-4 left-4 label-accent px-4 py-2 rounded-full text-white ${
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
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category */}
            <span className="label-accent text-[#6F6F6F] mb-3">
              {product.category.toUpperCase()}
            </span>

            {/* Name */}
            <h1 className="heading-display text-[clamp(28px,4vw,48px)] text-[#111] mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating!)
                          ? 'text-[#F2C94C] fill-[#F2C94C]'
                          : 'text-[#e5e5e5]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#6F6F6F]">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-[#111]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-[#6F6F6F] line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[#6F6F6F] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="label-accent text-[#6F6F6F]">QUANTITY</span>
              <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F6F6F2] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F6F6F2] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isLiked
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'border-[#111] hover:bg-[#111] hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#111]/10">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-6 h-6 text-[#F2C94C]" />
                <span className="text-xs text-[#6F6F6F]">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-6 h-6 text-[#F2C94C]" />
                <span className="text-xs text-[#6F6F6F]">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw className="w-6 h-6 text-[#F2C94C]" />
                <span className="text-xs text-[#6F6F6F]">Easy Returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="heading-display text-2xl text-[#111] mb-8">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} size="medium" />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
