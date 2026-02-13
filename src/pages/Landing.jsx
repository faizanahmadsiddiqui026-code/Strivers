import React from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, Store, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import Logo from '../assets/logo.jpeg';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center">
              <img src={Logo} alt="Logo" className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">ThelaTak</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/customer/login')}
              className="text-gray-700 hover:text-[#FF6B00] font-medium transition-colors"
            >
              Customer Login
            </button>
            <button
              onClick={() => navigate('/vendor/login')}
              className="text-gray-700 hover:text-[#FF6B00] font-medium transition-colors"
            >
              Vendor Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Skip the Queue,<br />
                <span className="text-[#FF6B00]">Savor the Flavor</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Pre-order from your favorite street food vendors and pick up when ready. 
                No more waiting in long lines!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/customer/signup')}
                size="lg"
                className="flex items-center justify-center gap-2 text-lg px-8"
              >
                <ShoppingBag className="w-5 h-5" />
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={() => navigate('/vendor/signup')}
                variant="secondary"
                size="lg"
                className="flex items-center justify-center gap-2 text-lg px-8"
              >
                <Store className="w-5 h-5" />
                Register Your Stall
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <p className="text-3xl font-bold text-[#FF6B00]">500+</p>
                <p className="text-sm text-gray-600">Active Vendors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#FF6B00]">10K+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#FF6B00]">50K+</p>
                <p className="text-sm text-gray-600">Orders Completed</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
                alt="Street food"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Order Placed!</p>
                  <p className="text-sm text-gray-600">Ready in 15 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">How It Works</h3>
            <p className="text-xl text-gray-600">Simple, fast, and convenient</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Customers */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-orange-100">
              <div className="w-14 h-14 bg-[#FF6B00] rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4">For Customers</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] font-bold mt-1">1.</span>
                  <span>Browse nearby street vendors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] font-bold mt-1">2.</span>
                  <span>Pre-order your favorite dishes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] font-bold mt-1">3.</span>
                  <span>Pick up when ready - no waiting!</span>
                </li>
              </ul>
            </div>

            {/* For Vendors */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200">
              <div className="w-14 h-14 bg-[#2C3E50] rounded-full flex items-center justify-center mb-6">
                <Store className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4">For Vendors</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] font-bold mt-1">1.</span>
                  <span>Register your stall for free</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] font-bold mt-1">2.</span>
                  <span>Receive & manage pre-orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] font-bold mt-1">3.</span>
                  <span>Grow your business reach</span>
                </li>
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <ArrowRight className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Why Choose Us</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] font-bold mt-1">✓</span>
                  <span>Save time - no queues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] font-bold mt-1">✓</span>
                  <span>Support local vendors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B00] font-bold mt-1">✓</span>
                  <span>Secure UPI & cash payments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-linear-to-r from-[#FF6B00] to-[#E65F00] rounded-3xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of happy customers and vendors on Street Bites
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/customer/signup')}
              className="bg-red-500 text-black text-lg px-8"
              size="lg"
            >
              Sign Up as Customer
            </Button>
            <Button
              onClick={() => navigate('/vendor/signup')}
              variant="secondary"
              className="border-2 border-white text-white hover:bg-white hover:text-[#FF6B00] text-lg px-8"
              size="lg"
            >
              Register as Vendor
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">Street Bites</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting customers with local street food vendors across India
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3">For Customers</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Browse Vendors</a></li>
                <li><a href="#" className="hover:text-white">How to Order</a></li>
                <li><a href="#" className="hover:text-white">Track Order</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">For Vendors</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Register Stall</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 ThelaTak. Made for local street vendors 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}