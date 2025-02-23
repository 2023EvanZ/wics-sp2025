import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white py-3 px-6 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">Go Loco</h1>
            <div className="flex gap-4">
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