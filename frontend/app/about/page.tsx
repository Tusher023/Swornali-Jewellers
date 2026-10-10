import Image from 'next/image';
import { LiveGoldRateSection } from '../../components/live-gold-rate';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <header className="page-header text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-display text-(--gold-400) mb-4">Our Heritage & Story</h1>
          <p className="text-(--text-secondary) text-lg max-w-2xl mx-auto">
            A legacy of master craftsmanship, purity, and timeless elegance founded by Ram Prasad Tarafder in Jashore.
          </p>
        </header>

        {/* Brand Story */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-(--gold-400)/10 border border-(--gold-400)/30 rounded text-xs text-(--gold-400) uppercase tracking-widest font-semibold">
                স্বর্ণালী জুয়েলার্স · যশোর
              </div>
              <h2 className="text-3xl font-display text-(--gold-400)">ঐতিহ্য, হলমার্ক ও বিশ্বাস</h2>
              <p className="text-(--text-secondary) leading-relaxed">
                প্রোপ্রাইটর <strong>রাম প্রসাদ তরফদার</strong>-এর নেতৃত্বে যশোরের রাজগঞ্জ রোডের মেহেদী মার্কেটে অবস্থিত <strong>স্বর্ণালী জুয়েলার্স</strong> দীর্ঘদিন ধরে স্বর্ণের বিশুদ্ধতা, গুণমান ও আস্থার এক অনন্য মানদণ্ড প্রতিষ্ঠা করে আসছে।
              </p>
              <p className="text-(--text-secondary) leading-relaxed">
                আমরা রুচিশীল আধুনিক ডিজাইনের গিনি সোনা, পাশাপাশি হলমার্কযুক্ত ১৮ ক্যারেট, ২১ ক্যারেট ও ২২ ক্যারেট স্বর্ণ এবং বিশুদ্ধ রূপার গহনা তৈরি ও সরবরাহ করি। রাজকীয় বিবাহের ব্রাইডাল সেট থেকে শুরু করে প্রতিদিনের ব্যবহারের জন্য বিশেষভাবে তৈরি গহনা—প্রতিটি অলংকারই অত্যন্ত যত্ন, দক্ষতা ও কারিগরি নৈপুণ্যের সঙ্গে তৈরি করা হয়।
              </p>
              <p className="text-(--text-secondary) leading-relaxed">
                আমাদের কারখানা থেকে বের হওয়া প্রতিটি গহনার সঙ্গে থাকে হলমার্কযুক্ত বিশুদ্ধতার নিশ্চয়তা এবং নিখুঁত কারুশিল্পের প্রতিশ্রুতি।
              </p>
            </div>
            <div className="relative h-[420px] rounded-xl overflow-hidden shadow-2xl shadow-(--gold-400)/10 border border-(--gold-400)/20">
              <img 
                src="/Swornali-Jewellers/images/visiting-card.jpg" 
                alt="Swornali Jewellers Official Business Card - Ram Prasad Tarafder, Jashore" 
                className="w-full h-full object-contain bg-[#111] p-3"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-24">
          <h2 className="text-3xl font-display text-(--gold-400) text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-(--bg-card) p-8 rounded-xl border border-(--gold-400)/20 text-center hover:border-(--gold-400)/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 bg-(--gold-400)/10 flex items-center justify-center rounded-full text-(--gold-400)">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-(--text-primary) mb-3">Authenticity</h3>
              <p className="text-(--text-secondary) text-sm leading-relaxed">
                100% certified diamonds and hallmark gold. We guarantee the purity and origin of every piece we create.
              </p>
            </div>
            <div className="card bg-(--bg-card) p-8 rounded-xl border border-(--gold-400)/20 text-center hover:border-(--gold-400)/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 bg-(--gold-400)/10 flex items-center justify-center rounded-full text-(--gold-400)">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-(--text-primary) mb-3">Craftsmanship</h3>
              <p className="text-(--text-secondary) text-sm leading-relaxed">
                Meticulous attention to detail by master artisans with decades of experience in traditional jewelry making.
              </p>
            </div>
            <div className="card bg-(--bg-card) p-8 rounded-xl border border-(--gold-400)/20 text-center hover:border-(--gold-400)/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 bg-(--gold-400)/10 flex items-center justify-center rounded-full text-(--gold-400)">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-(--text-primary) mb-3">Sustainability</h3>
              <p className="text-(--text-secondary) text-sm leading-relaxed">
                Committed to ethically sourced gems and sustainable practices to protect our planet for future generations.
              </p>
            </div>
          </div>
        </section>

        {/* Craftsmanship */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-xl overflow-hidden border border-(--gold-400)/20">
              <Image 
                src="https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop" 
                alt="Jewelry Tools" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl font-display text-(--gold-400)">The Art of Making</h2>
              <p className="text-(--text-secondary) leading-relaxed">
                Behind every breathtaking design is a rigorous process of creation. Our craftsmen spend hours perfecting every curve, setting every stone with precision, and polishing every surface to a flawless mirror finish.
              </p>
              <p className="text-(--text-secondary) leading-relaxed">
                It is this dedication to perfection that makes Swornali Jewellers a trusted name across the nation.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="trust-bar bg-(--bg-secondary) border-y border-(--gold-400)/20 py-12 -mx-4 px-4 md:-mx-8 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            <div>
              <div className="text-4xl font-display text-(--gold-400) mb-2">5000+</div>
              <div className="text-(--text-secondary) text-sm uppercase tracking-wider">Pieces Crafted</div>
            </div>
            <div>
              <div className="text-4xl font-display text-(--gold-400) mb-2">2000+</div>
              <div className="text-(--text-secondary) text-sm uppercase tracking-wider">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-display text-(--gold-400) mb-2">22K</div>
              <div className="text-(--text-secondary) text-sm uppercase tracking-wider">Purest Gold</div>
            </div>
            <div>
              <div className="text-4xl font-display text-(--gold-400) mb-2">100%</div>
              <div className="text-(--text-secondary) text-sm uppercase tracking-wider">Certified</div>
            </div>
          </div>
        </section>

        {/* Live Gold Rate Today (BAJUS Bangladesh) */}
        <section className="mt-16">
          <LiveGoldRateSection />
        </section>

      </div>
    </div>
  );
}
