import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-white flex items-center justify-center px-4">
      
      <div className="text-center space-y-8">
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Street Vendor Pre-Order Platform
        </h1>

        <p className="text-gray-500 text-sm md:text-base">
          Order nearby street food. Skip the wait.
        </p>

        <div className="flex flex-col gap-4 w-64 mx-auto">
          
          <button
            onClick={() => navigate("/customer")}
            className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Customer
          </button>

          <button
            onClick={() => navigate("/vendor")}
            className="bg-gray-800 hover:bg-black transition text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Vendor
          </button>

        </div>
      </div>
    </div>
  );
}
