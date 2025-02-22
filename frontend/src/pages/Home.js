import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import MoreSidebar from "../components/MoreSidebar";

const Home = () => {
    const { authTokens } = useContext(AuthContext);
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);

    return (
        <div>
            <h1>Welcome to BizTok</h1>

            {authTokens ? (
                <>
                    <p>You are logged in!</p>
                    <button onClick={() => setSelectedBusinessId(1)}>More</button>
                </>
            ) : (
                <>
                    <p>You are not logged in.</p>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </>
            )}

            {/* Sidebar for business details */}
            {selectedBusinessId && (
                <MoreSidebar
                    businessId={selectedBusinessId}
                    onClose={() => setSelectedBusinessId(null)}
                />
            )}
        </div>
    );
};

export default Home;