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
        <div className="flex items-center justify-center gap-x-6 mt-2">
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="vote"
                    value="like"
                    checked={userVote === "like"}
                    onChange={() => handleVote("like")}
                    readOnly
                    className="w-5 h-5"
                />
                <span className="text-lg">👍 ({likes})</span>
            </label>
    
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="vote"
                    value="dislike"
                    checked={userVote === "dislike"}
                    onChange={() => handleVote("dislike")}
                    readOnly
                    className="w-5 h-5"
                />
                <span className="text-lg">👎 ({dislikes})</span>
            </label>
        </div>
    );
};

export default Votes;