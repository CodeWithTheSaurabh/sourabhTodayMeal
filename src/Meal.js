// Import React and the useState and useEffect hooks from the React library
import React, { useState, useEffect } from "react";

// Define a functional component named Meal that takes a meal object as a prop
export default function Meal({ meal }) {
  // Initialize a state variable imageUrl to store the URL of the meal's image
  const [imageUrl, setImageUrl] = useState("");

  // Use the useEffect hook to fetch the meal's image URL from the Spoonacular API
  useEffect(() => {
    // Construct the API URL using the meal's ID and API key
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=cb1c464d94f142c08b156c5beddade8b&includeNutrition=false`
    )
      // Parse the response as JSON
      .then((response) => response.json())
      // Extract the image URL from the response data and update the imageUrl state variable
      .then((data) => {
        setImageUrl(data.image);
      })
      // Catch any errors that occur during the fetch process and log an error message to the console
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]); // Re-run the effect when the meal's ID changes

  // Return JSX elements to display the meal's information
  return (
    <article>
      {/* Display the meal's title */}
      <h1>{meal.title}</h1>
      {/* Display the meal's image using the imageUrl state variable */}
      <img src={imageUrl} alt="recipe" />
      {/* Display the meal's preparation time and number of servings */}
      <ul className="instructions">
        <li>Preparation time: {meal.readyInMinutes} minutes</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>

      {/* Link to the meal's source URL */}
      <a href={meal.sourceUrl}>Go to Recipe</a>
    </article>
  );
}