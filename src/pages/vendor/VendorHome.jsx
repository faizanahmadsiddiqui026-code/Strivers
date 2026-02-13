import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Menu,
  Wallet,
  Store,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Plus,
  Check,
  X,
} from "lucide-react";

/* ================= MOCK DATA ================= */

const mockOrders = [
  {
    id: "#TT-2031",
    customer: "Rahul Sharma",
    items: ["Pani Puri x2", "Aloo Tikki"],
    total: 120,
    payment: "UPI",
    status: "Pending",
  },
  {
    id: "#TT-2032",
    customer: "Neha Verma",
    items: ["Schezwan Noodles"],
    total: 80,
    payment: "Cash",
    status: "Accepted",
  },
];

const mockMenu = [
  { id: 1, name: "Pani Puri", price: 40, available: true },
  { id: 2, name: "Aloo Tikki", price: 50, available: true },
  { id: 3, name: "Dahi Bhalla", price: 60, available: false },
];

/* ================= LAYOUT ================= */

export default function VendorDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6">
          {activePage === "dashboard" && <DashboardHome />}
          {activePage === "orders" && <OrdersPage />}
          {activePage === "menu" && <MenuPage />}
          {activePage === "wallet" && <WalletPage />}
          {activePage === "profile" && <ShopProfile />}
          {activePage === "analytics" && <AnalyticsPage />}
          {activePage === "settings" && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}

/* ================= SIDEBAR ================= */

function Sidebar({ activePage, setActivePage }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "menu", label: "Menu Management", icon: Menu },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "profile", label: "Shop Profile", icon: Store },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
      <h2 className="text-2xl font-bold text-[#FF6B00] mb-8">ThelaTak</h2>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activePage === item.id
                  ? "bg-[#FF6B00] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-4">
        <button className="flex items-center gap-2 text-red-600">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

/* ================= TOPBAR ================= */

function Topbar() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Vendor Panel</h1>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            2
          </span>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Sharma's Chaat</p>
          <p className="text-gray-500">Wallet: ₹2,450</p>
        </div>
      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function DashboardHome() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <StatCard title="Today's Orders" value="18" />
      <StatCard title="Pending Orders" value="3" />
      <StatCard title="Today's Revenue" value="₹3,200" />
      <StatCard title="Wallet Balance" value="₹2,450" />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

/* ================= ORDERS ================= */

function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex justify-between mb-4">
            <div>
              <p className="font-bold">{order.id}</p>
              <p className="text-gray-500 text-sm">{order.customer}</p>
            </div>
            <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
              {order.status}
            </span>
          </div>

          <ul className="text-sm text-gray-600 mb-4">
            {order.items.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <p className="font-semibold">
              ₹{order.total} ({order.payment})
            </p>

            {order.status === "Pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(order.id, "Accepted")}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
                >
                  <Check size={16} /> Accept
                </button>
                <button
                  onClick={() => updateStatus(order.id, "Rejected")}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2"
                >
                  <X size={16} /> Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= MENU ================= */

function MenuPage() {
  const [menu, setMenu] = useState(mockMenu);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Menu Items</h2>
        <button className="flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 rounded-lg">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-500 text-sm mb-4">₹{item.price}</p>

            <button
              className={`px-3 py-1 rounded-full text-sm ${
                item.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {item.available ? "Available" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= WALLET ================= */

function WalletPage() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>
      <p className="text-3xl font-bold text-[#FF6B00] mb-4">₹2,450</p>

      <button className="bg-[#FF6B00] text-white px-6 py-2 rounded-lg">
        Recharge Wallet
      </button>
    </div>
  );
}

/* ================= PROFILE ================= */

function ShopProfile() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Shop Profile</h2>

      <div className="space-y-4">
        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Shop Name"
        />
        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="UPI ID"
        />
        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Phone"
        />

        <button className="bg-[#FF6B00] text-white px-6 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ================= ANALYTICS ================= */

function AnalyticsPage() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
      <p className="text-gray-500">
        Charts will be integrated here (Revenue, Orders trend, Top Items).
      </p>
    </div>
  );
}

/* ================= SETTINGS ================= */

function SettingsPage() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 max-w-xl">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>

      <button className="bg-red-500 text-white px-6 py-2 rounded-lg">
        Deactivate Account
      </button>
    </div>
  );
}
