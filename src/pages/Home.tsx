import { useEffect, useState } from "react";
import { Slider } from "../api/slidersapi";
import axios from "axios";

const Home = () => {
    const [featuredSlider, setFeaturedSlider] = useState<Slider | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchFeaturedSlider = async () => {
        try {
          const response = await axios.get("/api/sliders/featured");
          setFeaturedSlider(response.data);
        } catch (error: any) {
          setError(error.response?.data?.message || "Error fetching featured slider");
          console.error("Error fetching featured slider:", error);
        }
      };
      fetchFeaturedSlider();
    }, []);
  
    if (error) {
      return <div className="text-red-500">{error}</div>;
    }
  
    if (!featuredSlider) {
      return <div>No featured slider available</div>;
    }
  
    return (
      <div>
        <h1>{featuredSlider.title}</h1>
        <img src={featuredSlider.imageUrl} alt={featuredSlider.title} />
      </div>
    );
  };
  
  export default Home;