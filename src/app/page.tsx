import { allModels } from "@/lib/data";
import { BikeCard } from "@/components/BikeCard";
import { HorizontalBikeCard } from "@/components/HorizontalBikeCard";
import { CompareSelector } from "@/components/CompareSelector";
import { HomePageClient } from "@/components/HomePageClient";
import { SearchResultsWrapper } from "@/components/SearchResultsWrapper";
import { SearchProvider } from "@/contexts/SearchContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Users, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";

// SEO Metadata
export const metadata: Metadata = {
  title: "Electric Wheels - Compare EV Bikes in Pakistan | Best Electric Bike Prices & Reviews",
  description: "Compare electric bikes in Pakistan. Find the best EV bike prices, specs, and dealers. Expert reviews and buying guides for all major brands including Evee, Vlektra, and Metro.",
  keywords: "electric bikes Pakistan, EV bikes, electric scooter, bike comparison, Pakistan electric vehicles, green transportation",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Electric Wheels - Compare EV Bikes in Pakistan",
    description: "Find the perfect electric bike for you. Compare prices, specs, and dealers for all major EV bike brands in Pakistan.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Electric Wheels - EV Bike Comparison Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Electric Wheels - Compare EV Bikes in Pakistan",
    description: "Find the perfect electric bike for you. Compare prices, specs, and dealers.",
    images: ["/og-image.jpg"]
  }
};

export default async function HomePage() {
  const featuredModels = allModels.slice(0, 6);

  const features = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Compare Prices",
      description: "Find the best deals and compare prices across all major EV bike brands in Pakistan."
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Detailed Specs",
      description: "Compare battery life, speed, range, and all technical specifications side by side."
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Trusted Dealers",
      description: "Connect with verified dealers and authorized distributors near you."
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Expert Guides",
      description: "Learn about EV bikes, maintenance tips, and buying guides from our experts."
    }
  ];

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Electric Wheels",
    "description": "Compare electric bikes in Pakistan. Find the best EV bike prices, specs, and dealers.",
    "url": "https://www.electricwheels.pk",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.electricwheels.pk/bikes?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Electric Wheels",
      "url": "https://www.electricwheels.pk"
    }
  };

  return (
    <>
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SearchProvider initialModels={allModels}>
        <div className="min-h-screen w-full">
        {/* Hero Section with Search */}
        <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 py-16 sm:py-20 lg:py-24 w-full">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center space-y-8 sm:space-y-10">
              <div className="space-y-4 sm:space-y-6">
                <Badge variant="secondary" className="text-xs sm:text-sm px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Pakistan&apos;s #1 EV Bike Comparison Platform
                </Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  Find Your Perfect
                  <span className="text-green-600 dark:text-green-400 block sm:inline"> Electric Bike</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Search and filter through all major EV bike brands in Pakistan. 
                  Compare prices, specs, and find the perfect bike for your needs.
                </p>
              </div>
              
              {/* Search and Filters */}
              <div className="max-w-5xl mx-auto">
                <HomePageClient />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Bikes Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-muted/30 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Trending Electric Bikes
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                Discover the most popular EV bikes in Pakistan, handpicked by our experts.
              </p>
            </div>
            
            {/* Horizontal Scrollable Cards */}
            <div className="relative">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {featuredModels.map((model, index) => (
                  <HorizontalBikeCard key={model.id} model={model} index={index} />
                ))}
              </div>
              
              {/* Scroll Indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {featuredModels.map((_, index) => (
                  <div key={index} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-8 sm:mt-12 space-y-4">
              <p className="text-sm text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Explore our complete collection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button asChild variant="default" size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                  <Link href="/bikes">
                    View All Bikes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/search">
                    Advanced Search
                    <Zap className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-background w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Why Choose Electric Wheels?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                We make finding and comparing electric bikes simple, transparent, and trustworthy.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">
                      {feature.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compare Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-muted/30 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Compare Bikes Instantly
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Select two bikes to see a detailed side-by-side comparison of specs, prices, and features.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <CompareSelector models={allModels} />
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-green-600 dark:bg-green-700 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Ready to Find Your Perfect EV Bike?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-green-100 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who found their ideal electric bike with our help.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  <Link href="/bikes">
                    Start Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-white text-white hover:bg-white hover:text-green-600">
                  <Link href="/dealers">
                    Find Dealers
                  </Link>
                </Button>
              </div>
            </div>
        </div>
                </section>
            </div>
      </SearchProvider>
    </>
  );
}
