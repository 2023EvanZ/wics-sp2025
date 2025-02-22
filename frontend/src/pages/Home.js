import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import MoreSidebar from "../components/MoreSidebar";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
    const { authTokens } = useContext(AuthContext);
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);
    const navigate = useNavigate();

    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (!authTokens) {
            navigate("/login");
        }
    }, [authTokens, navigate]);

    return (
        <div>
            <h1>Welcome to BizTok</h1>

            {authTokens ? (
                <>
                    <p>You are logged in!</p>
                    <button onClick={() => setSelectedBusinessId(1)}>More</button>
                    <LogoutButton />
                </>
            ) : (
                <>
                    <p>You are not logged in. Redirecting to login...</p>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </>
            )}

            {/* Sidebar for business details (only visible if logged in) */}
            {authTokens && selectedBusinessId && (
                <MoreSidebar
                    businessId={selectedBusinessId}
                    onClose={() => setSelectedBusinessId(null)}
                />
            )}
        </div>
    );
};

export default Home;