
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>React + FastAPI</h1>
      <p>Users retrieved from the Python backend</p>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id} — {user.name}
            </li>
          ))}
        </ul>
      )}
      
    </main>
  );
}

export default App;
