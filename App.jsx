import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://boringapi.com/api/v1/photos/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        return response.json();
      })
      .then((data) => {
        setPhotos(data.photos.slice(0, 20)); // first 20 photos
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 className="status">Loading photos...</h2>;
  }

  if (error) {
    return <h2 className="status error">Error: {error}</h2>;
  }

  return (
    <div className="container">
      <h1>Photo Gallery</h1>

      <div className="grid">
        {photos.map((photo) => (
          <div className="card" key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
