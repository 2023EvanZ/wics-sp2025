import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import MoreSidebar from "../components/MoreSidebar";
import LogoutButton from "../components/LogoutButton";
import axios from "axios";

const Home = () => {
    const { authTokens } = useContext(AuthContext);
    const [businessId, setBusinessId] = useState(1); // Assume displaying business ID 1
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userVote, setUserVote] = useState(null); // Track user vote ("like", "dislike", or null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!authTokens) {
            navigate("/login");
            return;
        }

        const fetchBusinessDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/business/${businessId}/`);

                console.log("HOME: " + response.data.id);

                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
                setBusinessId(response.data.id);
            } catch (error) {
                console.error("Error fetching business details:", error.response?.data);
            }
        };

        fetchBusinessDetails();
    }, [authTokens, navigate, businessId]);

    const handleVote = async (voteType) => {
        if (userVote === voteType) return;

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/business/${businessId}/vote/${voteType}/`,
                {},
                {
                    headers: authTokens ? { Authorization: `Bearer ${authTokens.access}` } : {},
                }
            );

            if (voteType === "like") {
                setLikes((prev) => prev + 1);
                if (userVote === "dislike") {
                    setDislikes((prev) => prev - 1); // Remove previous dislike if switching
                }
            } else if (voteType === "dislike") {
                setDislikes((prev) => prev + 1);
                if (userVote === "like") {
                    setLikes((prev) => prev - 1); // Remove previous like if switching
                }
            }

            // setLikes(response.data.likes);
            // setDislikes(response.data.dislikes);
            setUserVote(voteType);
        } catch (error) {
            console.error("Vote failed:", error.response?.data);
        }
    };

    return (
        <div>
            <h1>Welcome to BizTok</h1>

            {authTokens ? (
                <>
                    <p>You are logged in!</p>
                    <button onClick={() => setSelectedBusinessId(1)}>More</button>
                    <LogoutButton />
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="vote"
                                value="like"
                                checked={userVote === "like"}
                                onChange={() => handleVote("like")}
                            />
                            👍 Like ({likes})
                        </label>

                        <label style={{ marginLeft: "20px" }}>
                            <input
                                type="radio"
                                name="vote"
                                value="dislike"
                                checked={userVote === "dislike"}
                                onChange={() => handleVote("dislike")}
                            />
                            👎 Dislike ({dislikes})
                        </label>
                    </div>
                </>
            ) : (
                <>
                    <p>You are not logged in. Redirecting to login...</p>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </>
            )}

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