import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white py-5 px-6 flex items-center relative shadow-md">
            <h1 className="text-xl font-bold">Go Loco</h1>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
                <Link to="/" className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
                    FYP
                </Link>
                <Link to="/top" className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
                    Top
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;