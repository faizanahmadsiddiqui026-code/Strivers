import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ChevronRight,
  Clock,
  MapPin,
  X,
  ChevronDown,
  Home,
  ShoppingBag,
  User,
  Search,
  Plus,
  Star
} from 'lucide-react';
import { Navigate } from 'react-router';

// --- MOCK DATA ---

const vendors = [
  {
    id: '1',
    name: "Sharma's Chaat Corner",
    cuisine: 'Chaat, North Indian',
    rating: 4.5,
    distance: 0.8,
    priceForTwo: 100,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1769019401093-38f564d6408a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFhdCUyMGluZGlhbiUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzcwOTc0MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    name: "Momo King",
    cuisine: 'Momos, Chinese',
    rating: 4.3,
    distance: 1.2,
    priceForTwo: 120,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1694850184798-320a8e10bb5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb21vcyUyMGR1bXBsaW5nc3xlbnwxfHx8fDE3NzA5NTE3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    name: "Street Wok",
    cuisine: 'Chinese, Noodles',
    rating: 4.7,
    distance: 0.5,
    priceForTwo: 150,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1682224932581-1fe063b105fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwc3RyZWV0JTIwZm9vZCUyMG5vb2RsZXN8ZW58MXx8fHwxNzcwOTc0MjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    name: "Pav Bhaji Paradise",
    cuisine: 'Pav Bhaji, Mumbai Street',
    rating: 4.6,
    distance: 1.5,
    priceForTwo: 80,
    isOpen: false,
    imageUrl: 'https://images.unsplash.com/photo-1714298927751-8490e19750e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXYlMjBiaGFqaSUyMGluZGlhbiUyMGZvb2R8ZW58MXx8fHwxNzcwOTc0MjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    name: "Samosa Junction",
    cuisine: 'Samosa, Snacks',
    rating: 4.2,
    distance: 0.9,
    priceForTwo: 60,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBpbmRpYW4lMjBzbmFja3xlbnwxfHx8fDE3NzA5NzQyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    name: "Kulfi Corner",
    cuisine: 'Desserts, Ice Cream',
    rating: 4.8,
    distance: 0.6,
    priceForTwo: 90,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1760263051323-fcd7da7040b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kJTIwdmVuZG9yJTIwc3RhbGx8ZW58MXx8fHwxNzcwOTc0MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    name: "Rolls Express",
    cuisine: 'Rolls, Fast Food',
    rating: 4.4,
    distance: 1.8,
    priceForTwo: 140,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1769019401093-38f564d6408a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFhdCUyMGluZGlhbiUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzcwOTc0MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '8',
    name: "Biryani Bazaar",
    cuisine: 'Biryani, Mughlai',
    rating: 4.9,
    distance: 2.1,
    priceForTwo: 200,
    isOpen: false,
    imageUrl: 'https://images.unsplash.com/photo-1694850184798-320a8e10bb5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb21vcyUyMGR1bXBsaW5nc3xlbnwxfHx8fDE3NzA5NTE3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const trendingDishes = [
  {
    id: '1',
    name: 'Pani Puri',
    vendorName: "Sharma's Chaat Corner",
    price: 40,
    imageUrl: 'https://images.unsplash.com/photo-1769019401093-38f564d6408a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFhdCUyMGluZGlhbiUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzcwOTc0MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    name: 'Veg Momos (8 pcs)',
    vendorName: 'Momo King',
    price: 60,
    imageUrl: 'https://images.unsplash.com/photo-1694850184798-320a8e10bb5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb21vcyUyMGR1bXBsaW5nc3xlbnwxfHx8fDE3NzA5NTE3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    name: 'Schezwan Noodles',
    vendorName: 'Street Wok',
    price: 80,
    imageUrl: 'https://images.unsplash.com/photo-1682224932581-1fe063b105fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwc3RyZWV0JTIwZm9vZCUyMG5vb2RsZXN8ZW58MXx8fHwxNzcwOTc0MjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    name: 'Butter Pav Bhaji',
    vendorName: 'Pav Bhaji Paradise',
    price: 70,
    imageUrl: 'https://images.unsplash.com/photo-1714298927751-8490e19750e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXYlMjBiaGFqaSUyMGluZGlhbiUyMGZvb2R8ZW58MXx8fHwxNzcwOTc0MjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    name: 'Aloo Samosa (2 pcs)',
    vendorName: 'Samosa Junction',
    price: 30,
    imageUrl: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBpbmRpYW4lMjBzbmFja3xlbnwxfHx8fDE3NzA5NzQyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];


const vendorMenus = {
  '1': [
    { id: 'm1', name: 'Pani Puri', price: 40 },
    { id: 'm2', name: 'Bhel Puri', price: 50 },
  ],
  '2': [
    { id: 'm3', name: 'Veg Momos', price: 60 },
    { id: 'm4', name: 'Fried Momos', price: 70 },
  ],
};

// --- COMPONENTS ---

function MenuModal({ vendor, menu, onClose, onAddToCart }) {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">
      <div className="bg-white w-full md:max-w-lg rounded-t-2xl md:rounded-2xl p-6 max-h-[80vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">{vendor.name}</h3>
            <p className="text-sm text-gray-500">{vendor.cuisine}</p>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {menu.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
              <button
                onClick={() => onAddToCart(item)}
                className="px-4 py-1.5 bg-[#FF6B00] text-white rounded-lg text-sm"
              >
                Add
              </button>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function ActiveOrderWidget({ vendorName, orderId, status }) {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-40">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-[#FF6B00] animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm mb-0.5">{status}</p>
            <p className="text-gray-600 text-sm">{vendorName}</p>
            <p className="text-gray-400 text-xs mt-0.5">Order ID: {orderId}</p>
          </div>
          <button className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg font-medium hover:bg-[#e66100] transition-colors flex items-center gap-1 whitespace-nowrap">
            Track Order
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <MapPin className="w-32 h-32 text-gray-300" />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-center">No vendors available nearby</h2>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        We couldn't find any street food vendors in your area. Try changing your location to discover amazing local food.
      </p>
      <button className="px-6 py-3 bg-[#FF6B00] text-white rounded-lg font-medium hover:bg-[#e66100] transition-colors">
        Change Location
      </button>
    </div>
  );
}

function FilterSort() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('Distance');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filters = [
    { id: 'open', label: 'Open Now' },
    { id: 'price', label: 'Under ₹100' },
    { id: 'rated', label: 'Top Rated' },
    { id: 'veg', label: 'Pure Veg' },
  ];

  const sortOptions = ['Distance', 'Rating', 'Price'];

  const toggleFilter = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${activeFilters.includes(filter.id)
              ? 'bg-[#FF6B00] text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-[#FF6B00] hover:text-[#FF6B00]'
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <button
          onClick={() => setShowSortDropdown(!showSortDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#FF6B00] transition-colors font-medium text-sm"
        >
          <span className="text-gray-500">Sort by:</span>
          <span>{sortBy}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {showSortDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSortBy(option);
                  setShowSortDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LocationBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <p className="font-medium text-yellow-900">Enable location to discover nearby vendors</p>
          <p className="text-sm text-yellow-700 mt-0.5">Get the best street food recommendations around you</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg font-medium hover:bg-[#e66100] transition-colors whitespace-nowrap">
          Enable Location
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 hover:bg-yellow-100 rounded transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5 text-yellow-700" />
        </button>
      </div>
    </div>
  );
}

function MobileBottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-3">
        <button className="flex flex-col items-center gap-1 px-6 py-2 text-[#FF6B00]">
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 px-6 py-2 text-gray-500 hover:text-[#FF6B00] transition-colors">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs font-medium">Orders</span>
        </button>
        <button className="flex flex-col items-center gap-1 px-6 py-2 text-gray-500 hover:text-[#FF6B00] transition-colors">
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Sector 62, Noida');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const locations = [
    'Sector 62, Noida',
    'Sector 18, Noida',
    'Greater Noida',
    'Connaught Place, Delhi',
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <h1 className="text-2xl font-bold text-[#FF6B00]">ThelaTak</h1>
          </div>
          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MapPin className="w-5 h-5 text-[#FF6B00]" />
              <span className="font-medium text-sm">📍 {selectedLocation}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showLocationDropdown && (
              <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowLocationDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors or dishes"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-medium text-sm">Orders</span>
            </button>
             <button onClick={()=>{navigate("/customer/cart")}} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-medium text-sm">Cart</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center text-white hover:bg-[#e66100] transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-red-600">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors or dishes"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
            />
          </div>
        </div>
        <div className="md:hidden pb-3">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF6B00]" />
              <span className="font-medium text-sm">📍 {selectedLocation}</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
          {showLocationDropdown && (
            <div className="mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowLocationDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function TrendingDishes({ dishes }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Trending Near You</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">{dish.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{dish.vendorName}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">₹{dish.price}</span>
                <button className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center text-white hover:bg-[#e66100] transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function VendorCard({
  name,
  cuisine,
  rating,
  distance,
  priceForTwo,
  isOpen,
  imageUrl,
  onViewMenu }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
          >
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-3">{cuisine}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{distance} km</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            ₹{priceForTwo} for two
          </div>
        </div>
        <button
          onClick={onViewMenu}
          className="w-full py-2.5 bg-[#FF6B00] text-white rounded-lg font-medium hover:bg-[#e66100] transition-colors">
          View Menu
        </button>
      </div>
    </div>
  );
}

// --- MAIN PAGE EXPORT ---

export default function CustomerHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [showLocationBanner, setShowLocationBanner] = useState(true);
  const [hasActiveOrder, setHasActiveOrder] = useState(true);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
        {showLocationBanner && (
          <div className="mb-6">
            <LocationBanner />
          </div>
        )}

        <TrendingDishes dishes={trendingDishes} />

        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Nearby Street Vendors</h2>
          <p className="text-gray-600">Freshly prepared. Ready for pickup.</p>
        </div>

        <div className="mb-6">
          <FilterSort />
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : showEmptyState ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                {...vendor}
                onViewMenu={() => {
                  setSelectedVendor(vendor);
                  setShowMenu(true);
                }}
              />
            ))}

          </div>
        )}
      </main>

      {hasActiveOrder && (
        <ActiveOrderWidget
          vendorName="Sharma's Chaat Corner"
          orderId="#TT2026-1234"
          status="Your order is being prepared"
        />
      )}
      {showMenu && (
        <MenuModal
          vendor={selectedVendor}
          menu={vendorMenus[selectedVendor.id] || []}
          onClose={() => setShowMenu(false)}
          onAddToCart={(item) => {
            console.log('Added to cart:', item);
          }}
        />
      )}

      <MobileBottomNav />
    </div>
  );
}