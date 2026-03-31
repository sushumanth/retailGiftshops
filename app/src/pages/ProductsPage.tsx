import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ShoppingBag } from 'lucide-react';
import { products, categories, normalizeCategory } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useSearchParams } from 'react-router-dom';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const catalogStats = useMemo(() => {
    const newArrivals = products.filter(
      (product) =>
        product.tag === 'NEW' || normalizeCategory(product.category) === 'new-arrivals'
    ).length;

    const inStock = products.filter((product) => product.inStock).length;

    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      newArrivals,
      inStock,
    };
  }, []);

  // Keep local category state in sync with browser URL (back/forward gestures)
  useEffect(() => {
    if (selectedCategory !== categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl, selectedCategory]);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory === categoryFromUrl) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);

    if (selectedCategory === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', selectedCategory);
    }

    // Replace avoids polluting history for each filter click, making back navigation reliable.
    setSearchParams(nextParams, { replace: true });
  }, [selectedCategory, categoryFromUrl, searchParams, setSearchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => normalizeCategory(p.category) === normalizeCategory(selectedCategory)
      );
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => {
          const aIsNew =
            a.tag === 'NEW' || normalizeCategory(a.category) === 'new-arrivals';
          const bIsNew =
            b.tag === 'NEW' || normalizeCategory(b.category) === 'new-arrivals';
          return Number(bIsNew) - Number(aIsNew);
        });
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  return (
    <main className="min-h-screen bg-[#F6F6F2] pt-24 pb-16">
      {/* Header */}
      <div className="px-6 lg:px-[6vw]">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="heading-display text-[clamp(40px,6vw,80px)] text-[#111]">
            ALL PRODUCTS
          </h1>
          <p className="text-[#6F6F6F] mt-4 max-w-xl">
            Discover our curated collection of gifts, fancy items, and everyday joys.
          </p>
        </motion.div>

        {/* Catalog Overview */}
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          <div className="bg-white rounded-2xl p-4 border border-[#EAEAE3]">
            <p className="label-accent text-[#6F6F6F] mb-1">Total Products</p>
            <p className="text-2xl font-bold text-[#111]">{catalogStats.totalProducts}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#EAEAE3]">
            <p className="label-accent text-[#6F6F6F] mb-1">Categories</p>
            <p className="text-2xl font-bold text-[#111]">{catalogStats.totalCategories}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#EAEAE3]">
            <p className="label-accent text-[#6F6F6F] mb-1">New Arrivals</p>
            <p className="text-2xl font-bold text-[#111]">{catalogStats.newArrivals}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#EAEAE3]">
            <p className="label-accent text-[#6F6F6F] mb-1">In Stock</p>
            <p className="text-2xl font-bold text-[#111]">{catalogStats.inStock}</p>
          </div>
        </motion.div>

        {/* Quick Category Overview */}
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#111] text-white'
                : 'bg-white text-[#111] hover:bg-[#111] hover:text-white'
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={`overview-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#F2C94C] text-[#111]'
                  : 'bg-white text-[#111] hover:bg-[#111] hover:text-white'
              }`}
            >
              {cat.name} ({cat.productCount})
            </button>
          ))}
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F6F6F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-transparent focus:border-[#F2C94C] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-[#6F6F6F]" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white rounded-full border border-transparent focus:border-[#F2C94C] focus:outline-none cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
              showFilters
                ? 'bg-[#111] text-white'
                : 'bg-white text-[#111] hover:bg-[#111] hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white rounded-2xl p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="label-accent text-[#6F6F6F] mb-4">CATEGORIES</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === 'all'
                            ? 'bg-[#F2C94C] text-[#111]'
                            : 'bg-[#F6F6F2] text-[#111] hover:bg-[#e5e5e0]'
                        }`}
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === cat.id
                              ? 'bg-[#F2C94C] text-[#111]'
                              : 'bg-[#F6F6F2] text-[#111] hover:bg-[#e5e5e0]'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="label-accent text-[#6F6F6F] mb-4">
                      PRICE RANGE: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </h3>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#6F6F6F] mb-6"
        >
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? 's' : ''}
        </motion.p>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} size="medium" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <ShoppingBag className="w-16 h-16 text-[#6F6F6F]/30 mb-4" />
            <p className="text-[#6F6F6F] text-lg">No products found</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange([0, 5000]);
              }}
              className="btn-primary mt-4"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
