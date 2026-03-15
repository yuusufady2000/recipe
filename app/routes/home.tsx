import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import Header from "~/components/header";
import type { RecipeItem } from "~/types";
import BreakFast from "./recipeCategories/breakFast";
import Hero from "~/components/hero";
import Lunch from "./recipeCategories/lunch";
import Dinner from "./recipeCategories/dinner";
import Dessert from "./recipeCategories/dessert";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "TastyBites" },
    { name: "description", content: "Discover and add tasty recipes by category." },
  ];
}

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeItem[]>();
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);




  return (
    <div>
     <Header/>
     <Hero/>
     <BreakFast/>
     <Lunch/>
     <Dinner/>
     <Dessert/>
    </div>
  );
}
