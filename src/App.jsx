import React, { useState, useEffect } from "react";

const API_KEY = "xOGEaH1oIJ1k1ZJPVcuyx6qf76ftjwePai0NsDwx"; 

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(
    parseInt(localStorage.getItem("requestCount")) || 0
  );

  // Keep track of how many times the user has made a request
  useEffect(() => {
    localStorage.setItem("requestCount", requestCount);
  }, [requestCount]);

  const handleSendQuery = async () => {
    // Limit to 3 requests
    if (requestCount >= 3) {
      alert("You have reached the maximum number of requests for this session.");
      return;
    }

    // Make sure there's something to ask
    if (!userQuery.trim()) {
      alert("Please enter a query.");
      return;
    }

    setLoading(true);
    setApiResponse(null);

    try {
      // Call your API Gateway endpoint
      const response = await fetch(
        "https://cjzestcpcf.execute-api.us-east-1.amazonaws.com/default/dem-bedrock-trigger",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Pass your API key (again, note security concerns)
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({ user_query: userQuery }),
        }
      );

      const results = await response.json();           
      const data = JSON.parse(results.body || "{}"); 
      const outputText = data.generated_response?.results?.[0]?.outputText;
      console.log("Output text:", outputText);

      setApiResponse(outputText || "No output text found.");
      setRequestCount(requestCount + 1);

    } catch (err) {
      console.error(err);
      setApiResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Left placeholder div if you want an image or styling */}
      <div className="div-left" >
        {/* You could place a background image here */}
      </div>

      {/* Right side with form */}
      <div className="form-div" style={{ flex: 1, padding: "2rem" }}>
        <form action="#" className="form">
          <h2 className="form__title">Ask a Question</h2>
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Ask me Anything?"
            className="input"
            style={{
              flex: "1",
              minWidth: "200px",
              marginBottom: "1rem"
            }}
          />
          <button
            className="btn"
            onClick={handleSendQuery}
            disabled={loading}
            style={{ minWidth: "100px", marginBottom: "1rem" }}
          >
            {loading ? "Loading..." : "Send"}
          </button>

          {apiResponse && (
            <div style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
              <strong>Response:</strong> {apiResponse}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
