import React from "react";
import Meal from "./Meal";

// This is a functional component that takes in a prop called `mealData`
export default function MealList({ mealData }) {
  // Extract the `nutrients` object from the `mealData` prop
  const nutrients = mealData.nutrients;

  return (
    // The main container element for the component
    <main>
      {/* // A section element to display the macro nutrients */}
      <section className="nutrients">
        <h1>Macros</h1>
        {/* An unordered list to display the individual macro nutrients */}
        <ul>
          {/* // List item for calories, rounded to 0 decimal places */}
          <li>Calories: {nutrients.calories.toFixed(0)}</li>
          {/* // List item for carbohydrates, rounded to 0 decimal places */}
          <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
          {/* // List item for fat, rounded to 0 decimal places */}
          <li>Fat: {nutrients.fat.toFixed(0)}</li>
          {/* // List item for protein, rounded to 0 decimal places */}
          <li>Protein: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      {/* // A section element to display the individual meals */}
      <section className="meals">
        {/* // Use the `map` function to iterate over the `meals` array in `mealData` */}
        {mealData.meals.map((meal) => {
          // Return a `Meal` component for each meal, passing the `meal` object as a prop
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section>
    </main>
  );
}