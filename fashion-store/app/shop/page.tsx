"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Search, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { DEMO_PRODUCTS, CATEGORIES } from "@/lib/demoData";
import { cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(20000);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [sort, setSort] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const filtered = useMemo(() => {
    let list = [...DEMO_PRODUCTS];

    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCat !== "all") {
      list = list.filter((p) => p.categoryId === selectedCat);
    }
    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        p.variants.some(
          (v) => selectedSizes.includes(v.size) && v.stock > 0
        )
      );
    }
    if (onlyOnSale) {
      list = list.filter((p) => p.isOnSale);
    }
    list = list.filter((p) => (p.salePrice || p.price) <= priceMax);

    if (sort === "price-low") list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    else if (sort === "price-high") list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    else if (sort === "newest") list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return list;
  }, [search, selectedCat, selectedSizes, priceMax, onlyOnSale, sort]);

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCat(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                selectedCat === cat.id
                  ? "bg-accent text-[#0a0a0b]"
                  : "btn-outline"
              )}
              style={selectedCat !== cat.id ? { color: "var(--text-secondary)" } : {}}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((sz) => (
            <button
              key={sz}
              id={`filter-size-${sz}`}
              onClick={() => toggleSize(sz)}
              className={cn(
                "w-10 h-10 rounded-lg text-xs font-bold transition-all",
                selectedSizes.includes(sz)
                  ? "bg-accent text-[#0a0a0b]"
                  : "btn-outline"
              )}
              style={!selectedSizes.includes(sz) ? { color: "var(--text-secondary)" } : {}}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Max Price: ₹{priceMax.toLocaleString()}
        </h3>
        <input
          type="range"
          min={500}
          max={20000}
          step={500}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-[#c8a96e]"
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          <span>₹500</span>
          <span>₹20,000</span>
        </div>
      </div>

      {/* Sale only */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          onClick={() => setOnlyOnSale((v) => !v)}
          className={cn(
            "w-10 h-6 rounded-full transition-all relative",
            onlyOnSale ? "bg-accent" : "bg-[var(--bg-elevated)]"
          )}
          style={{ border: "1px solid var(--border-col)" }}
        >
          <div
            className={cn(
              "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all",
              onlyOnSale ? "left-4" : "left-0.5"
            )}
          />
        </div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Sale items only
        </span>
      </label>

      {/* Clear */}
      <button
        onClick={() => {
          setSelectedCat("all");
          setSelectedSizes([]);
          setPriceMax(20000);
          setOnlyOnSale(false);
        }}
        className="text-xs text-accent hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Shop All
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {filtered.length} products found
          </p>
        </div>

        {/* Search + Sort bar */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              id="shop-search"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              </button>
            )}
          </div>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field w-auto px-4 cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <button
            id="mobile-filter-btn"
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden btn-outline px-4 rounded-xl flex items-center gap-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside
            className="hidden lg:block w-56 flex-shrink-0 rounded-2xl p-5 h-fit sticky top-24"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-col)" }}
          >
            <h2 className="font-semibold text-sm mb-5" style={{ color: "var(--text-primary)" }}>
              Filters
            </h2>
            <FilterPanel />
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-lg font-medium" style={{ color: "var(--text-primary)" }}>No products found</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <AnimatePresence>
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 z-50 max-h-[80vh] overflow-y-auto"
              style={{ background: "var(--bg-elevated)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>Filters</h3>
                <button onClick={() => setFiltersOpen(false)}>
                  <X className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
                </button>
              </div>
              <FilterPanel />
              <button
                onClick={() => setFiltersOpen(false)}
                className="btn-gold w-full py-3 rounded-full mt-6"
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
