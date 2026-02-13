import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Store, Mail, Lock } from 'lucide-react';
import { Button } from '../../components/Button';

export default function VendorLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:4000/vendor/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 🔥 IMPORTANT for cookies
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert('Login successful!');
    navigate('/vendor/home');

  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
};

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-white flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#2C3E50] to-[#34495E] p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Store className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <h1 className="text-3xl font-bold">ThelaTak Vendor</h1>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Welcome Back, Vendor!
          </h2>
          <p className="text-xl text-gray-300">
            Manage your orders, menu, and grow your business
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            
            <div>
              <h3 className="font-semibold mb-1">Manage Orders</h3>
              <p className="text-gray-300 text-sm">
                Accept and track customer orders in real-time
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
           
            <div>
              <h3 className="font-semibold mb-1">Update Menu</h3>
              <p className="text-gray-300 text-sm">
                Keep your menu and prices up to date
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            
            <div>
              <h3 className="font-semibold mb-1">Track Earnings</h3>
              <p className="text-gray-300 text-sm">
                Monitor your wallet and transaction history
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-[#2C3E50] rounded-full flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">ThelaTak</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Vendor Login</h2>
            <p className="text-gray-600">
              Access your vendor dashboard
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}> 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                   type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  placeholder="vendor@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#FF6B00] border-gray-300 rounded focus:ring-[#FF6B00]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#FF6B00] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Login to Dashboard
            </Button>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have a vendor account?{' '}
                <Link
                  to="/vendor/signup"
                  className="text-[#FF6B00] font-medium hover:underline"
                >
                  Register your stall
                </Link>
              </p>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <Link to="/">
              <Button type="button" variant="secondary" className="w-full">
                Back to Home
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
