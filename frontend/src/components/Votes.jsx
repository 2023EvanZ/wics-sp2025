import React, { useState, useEffect } from "react";
import axios from "axios";

const Votes = ({ businessId }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userVote, setUserVote] = useState(null);

    useEffect(() => {
        if (!businessId) return;

        const fetchVotes = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/business/${businessId}/`);
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);

                const voteResponse = await axios.get(
                    `http://127.0.0.1:8000/api/business/${businessId}/user-vote/`,
                    { withCredentials: true }
                );
                setUserVote(voteResponse.data.vote);

            } catch (error) {
                console.error("Error fetching votes:", error);
            }
        };

        fetchVotes();
    }, [businessId]); 
    const handleVote = async (voteType) => {
        try {
          console.log("UserVote: " + userVote);
          console.log("VoteType: " + voteType);
          if (userVote == null) {
              await axios.post(
                  `http://127.0.0.1:8000/api/business/${businessId}/vote/${voteType}/add/`,
                  {}, 
                  { withCredentials: true }
              );
          } else {
              await axios.post(
                  `http://127.0.0.1:8000/api/business/${businessId}/vote/${userVote}/subtract/`,
                  {}, 
                  { withCredentials: true }
              );
      
              await axios.post(
                  `http://127.0.0.1:8000/api/business/${businessId}/vote/${voteType}/add/`,
                  {}, 
                  { withCredentials: true }
              );
          }
      
          const response = await axios.get(`http://127.0.0.1:8000/api/business/${businessId}/`);
          setLikes(response.data.likes);
          setDislikes(response.data.dislikes);
          setUserVote(voteType);
        } catch (error) {
            console.error("Vote failed:", error.response?.data);
        }
      };

    return (
        <div>
            <label>
                <input
                    type="radio"
                    name="vote"
                    value="like"
                    checked={userVote === "like"}
                    onChange={() => handleVote("like")}
                    readOnly
                />
                👍 Like ({likes})
            </label>

            <label>
                <input
                    type="radio"
                    name="vote"
                    value="dislike"
                    checked={userVote === "dislike"}
                    onChange={() => handleVote("dislike")}
                    readOnly
                />
                👎 Dislike ({dislikes})
            </label>
        </div>
    );
};

export default Votes;