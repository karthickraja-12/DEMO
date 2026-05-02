"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Check,
} from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demoData";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/types";

const STATS = [
  { label: "Total Products", value: "12", icon: Package, change: "+3 this week", color: "text-blue-400" },
  { label: "Orders Today", value: "24", icon: ShoppingBag, change: "+12% vs yesterday", color: "text-green-400" },
  { label: "Total Customers", value: "1,284", icon: Users, change: "+58 this month", color: "text-purple-400" },
  { label: "Revenue (MTD)", value: "₹4.2L", icon: TrendingUp, change: "+18% vs last month", color: "text-accent" },
];

const MOCK_ORDERS = [
  { id: "ORD-001", customer: "Priya Sharma", items: 2, total: 15499, status: "DELIVERED", date: "2026-04-20" },
  { id: "ORD-002", customer: "Rahul Gupta", items: 1, total: 8999, status: "SHIPPED", date: "2026-04-20" },
  { id: "ORD-003", customer: "Aisha Khan", items: 3, total: 24998, status: "CONFIRMED", date: "2026-04-21" },
  { id: "ORD-004", customer: "Dev Patel", items: 1, total: 5499, status: "PENDING", date: "2026-04-21" },
  { id: "ORD-005", customer: "Sneha Roy", items: 2, total: 13998, status: "CONFIRMED", date: "2026-04-21" },
];

const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-400/10",
  CONFIRMED: "text-blue-400 bg-blue-400/10",
  SHIPPED: "text-purple-400 bg-purple-400/10",
  DELIVERED: "text-green-400 bg-green-400/10",
  CANCELLED: "text-red-400 bg-red-400/10",
};

type Tab = "overview" | "products" | "orders";

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "men" });

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center">
          <p className="text-2xl mb-3">🔒</p>
          <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Admin access required</p>
          <Link href="/auth/login" className="btn-gold px-6 py-2.5 rounded-full text-sm">Login as Admin</Link>
        </div>
      </div>
    );
  }

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: "New product added via admin dashboard.",
      price: Number(newProduct.price),
      images: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80"],
      category: { id: newProduct.category, name: newProduct.category, slug: newProduct.category, imageUrl: "" },
      categoryId: newProduct.category,
      variants: [
        { id: `${Date.now()}-m`, productId: Date.now().toString(), size: "M", stock: 10 },
        { id: `${Date.now()}-l`, productId: Date.now().toString(), size: "L", stock: 10 },
      ],
      isFeatured: false,
      isOnSale: false,
      tags: [],
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [product, ...prev]);
    setNewProduct({ name: "", price: "", category: "men" });
    setShowAddModal(false);
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" },
  ];

  return (
    <div className="min-h-screen pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              Admin Dashboard
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
              Welcome back, {user.name}
            </p>
          </div>
          <Link href="/" className="btn-outline px-4 py-2 rounded-full text-sm" style={{ color: "var(--text-secondary)" }}>
            ← Back to Store
          </Link>
        </div>

        {/* Tabs */}
        <div className="pill-nav w-fit mb-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              id={`admin-tab-${t.key}`}
              onClick={() => setTab(t.key)}
              className={`pill-nav-item ${tab === t.key ? "active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl p-5"
                  style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-col)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
                  <p className="text-xs text-green-400">{stat.change}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent orders preview */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-col)" }}>
              <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--border-col)" }}>
                <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Recent Orders</h2>
                <button onClick={() => setTab("orders")} className="text-xs text-accent hover:underline">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-col)" }}>
                      {["Order ID", "Customer", "Total", "Status"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.slice(0, 3).map((order) => (
                      <tr key={order.id} style={{ borderBottom: "1px solid var(--border-col)" }}>
                        <td className="px-5 py-3 font-mono text-xs text-accent">{order.id}</td>
                        <td className="px-5 py-3" style={{ color: "var(--text-primary)" }}>{order.customer}</td>
                        <td className="px-5 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>{formatPrice(order.total)}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {tab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{products.length} products</p>
              <button
                id="add-product-btn"
                onClick={() => setShowAddModal(true)}
                className="btn-gold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-col)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-col)" }}>
                      {["Product", "Category", "Price", "Stock", "Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
                      return (
                        <tr key={product.id} className="hover:bg-white/2 transition-colors" style={{ borderBottom: "1px solid var(--border-col)" }}>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <img src={product.images[0]} alt="" className="w-10 h-12 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium" style={{ color: "var(--text-primary)" }}>{product.name}</p>
                                {product.isFeatured && <span className="badge text-[10px]">Featured</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 capitalize" style={{ color: "var(--text-secondary)" }}>{product.category.name}</td>
                          <td className="px-5 py-3 font-semibold text-accent">{formatPrice(product.salePrice || product.price)}</td>
                          <td className="px-5 py-3">
                            <span className={`text-xs font-semibold ${totalStock === 0 ? "text-red-400" : totalStock < 5 ? "text-orange-400" : "text-green-400"}`}>
                              {totalStock === 0 ? "Out of stock" : `${totalStock} units`}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <Link href={`/product/${product.id}`} target="_blank" className="w-7 h-7 rounded-lg btn-outline flex items-center justify-center hover:text-accent transition-colors">
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <button className="w-7 h-7 rounded-lg btn-outline flex items-center justify-center hover:text-blue-400 transition-colors">
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`delete-${product.id}`}
                                onClick={() => handleDeleteProduct(product.id)}
                                className="w-7 h-7 rounded-lg btn-outline flex items-center justify-center hover:text-red-400 hover:border-red-400/30 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-col)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-col)" }}>
                    {["Order ID", "Customer", "Items", "Total", "Status", "Date"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-white/2 transition-colors" style={{ borderBottom: "1px solid var(--border-col)" }}>
                      <td className="px-5 py-4 font-mono text-xs text-accent">{order.id}</td>
                      <td className="px-5 py-4" style={{ color: "var(--text-primary)" }}>{order.customer}</td>
                      <td className="px-5 py-4" style={{ color: "var(--text-secondary)" }}>{order.items}</td>
                      <td className="px-5 py-4 font-semibold" style={{ color: "var(--text-primary)" }}>{formatPrice(order.total)}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs" style={{ color: "var(--text-muted)" }}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl p-6"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-col)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>Add New Product</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Product Name</label>
                <input
                  id="new-product-name"
                  className="input-field"
                  placeholder="e.g. Premium Linen Shirt"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Price (₹)</label>
                <input
                  id="new-product-price"
                  className="input-field"
                  type="number"
                  placeholder="e.g. 2999"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>Category</label>
                <select
                  id="new-product-category"
                  className="input-field"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="streetwear">Streetwear</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 btn-outline py-2.5 rounded-xl text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                id="confirm-add-product"
                onClick={handleAddProduct}
                className="flex-1 btn-gold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
