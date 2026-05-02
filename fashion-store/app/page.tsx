import HeroSection from "@/components/home/HeroSection";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import CTABanner from "@/components/home/CTABanner";
import TrendingSection from "@/components/home/TrendingSection";
import { DEMO_PRODUCTS } from "@/lib/demoData";

export default function HomePage() {
  const featured = DEMO_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <TrendingSection products={featured} />
      <CTABanner />
    </>
  );
}
