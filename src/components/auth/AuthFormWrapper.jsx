import { Link } from "react-router-dom";

const AuthFormWrapper = ({ title, children, footerText, footerLink, footerLinkText }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>

        {children}

        {/* <div className="mt-6 text-center text-sm text-gray-600">
          {footerText}{" "}
          <Link to={footerLink} className="text-black font-medium hover:underline">
            {footerLinkText}
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default AuthFormWrapper;
