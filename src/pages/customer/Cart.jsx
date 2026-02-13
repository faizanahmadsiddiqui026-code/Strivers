import { useState } from "react";
import { MapPin, Search, ShoppingBag, User, ChevronDown } from "lucide-react";
function Navbar() {
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


const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Veg Momos",
      price: 60,
      quantity: 2,
    },
    {
      id: 2,
      name: "Chowmein",
      price: 80,
      quantity: 1,
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const platformFee = Math.round(itemTotal * 0.05); // 5%
  const totalAmount = itemTotal + platformFee;

  return (
      <>
      <Navbar />
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 rounded border text-lg"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 rounded border text-lg"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    ₹{item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT - BILL SUMMARY */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Bill Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-base">
              <span>Total Payable</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="mt-6">
            <h3 className="font-medium mb-2">Payment Method</h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={() => setPaymentMethod("UPI")}
                />
                <span>UPI (Pay Now)</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="CASH"
                  checked={paymentMethod === "CASH"}
                  onChange={() => setPaymentMethod("CASH")}
                />
                <span>Cash (Pay at Shop)</span>
              </label>
            </div>
          </div>

          {/* PICKUP NOTE */}
          <div className="mt-4">
            <textarea
              placeholder="Any instructions for vendor?"
              className="w-full border rounded-lg p-2 text-sm resize-none"
              rows="3"
            />
          </div>

          {/* PLACE ORDER */}
          <button
            className="w-full mt-6 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition"
          >
            Place Order • ₹{totalAmount}
          </button>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Pickup from vendor. No delivery included.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;
