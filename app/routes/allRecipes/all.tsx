import { FaSearch, FaStar, FaUsers, FaClock, FaHome, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import type { RecipeItem } from "~/types";

const AllRecipes = () => {
  const [allRecipes, setAllRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllRecipes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/recipes`);
      const data = await res.json();
      setAllRecipes(data);
    } catch (error) {
      console.error("Error fetching all recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const search = useMemo(() => {
    if (!searchTerm) return allRecipes;
    return allRecipes.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, allRecipes]);

if(loading){
  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-500">
      <p className="text-gray-500">Loading recipes...</p>
    </div>
  )
}


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-6">
  <Link to="/"><FaArrowLeft /> Back to Home</Link>
<input type="text" placeholder="Search recipes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
{searchTerm && (
    <p className="text-gray-600">
      Results for "<span className="font-semibold">{searchTerm}</span>"
    </p>
  )}
<section>
   { search.length === 0 ? (
    <p>No recipes found.</p>
   ) : (
    
    <section>
      {search.map((recipe) => (
        
        <Link to={`/recipeInf/${recipe.id}`}>
            <div className="relative h-48">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-orange-600 hover:underline">{recipe.title}</h2>
                    <p className="text-gray-700 text-sm line-clamp-3">{recipe.summarys}</p>

                   
                    <div className="flex justify-between items-center mt-2 text-gray-600">
                      <div className="flex flex-col items-center text-center">
                        <p className="font-semibold">{recipe.serving}</p>
                        <FaUsers className="text-orange-500 mt-1" />
                        <p className="text-xs">Servings</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <p className="font-semibold">{recipe.foodReady} mins</p>
                        <FaClock className="text-orange-500 mt-1" />
                        <p className="text-xs">Ready In</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <p className="font-semibold">{recipe.foodScore}</p>
                        <FaStar className="text-orange-500 mt-1" />
                        <p className="text-xs">Score</p>
                      </div>
                    </div>
                  </div>
        </Link>
      ))}
    </section>
   )}
</section>
    </div>
  );
};

export default AllRecipes;