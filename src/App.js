// Import React and useState hook from the React library
import React, { useState } from "react";

// Import MealList component from a separate file
import MealList from "./MealList";

// Define the App component
function App() {
  // Initialize state variables for meal data, calories, weight, height, BMI, and suggested calories
  const [mealData, setMealData] = useState(null); // meal data is initially null
  const [calories, setCalories] = useState(2000); // default calories is 2000
  const [weight, setWeight] = useState(""); // state for weight input
  const [height, setHeight] = useState(""); // state for height input
  const [bmi, setBmi] = useState(null); // state for calculated BMI
  const [bmiResult, setBmiResult] = useState(""); // state for BMI result message
  const [suggestedCalories, setSuggestedCalories] = useState(null); // state for suggested calorie intake

  // Function to fetch meal data from the Spoonacular API
  function getMealData() {
    // Construct the API URL with the calories parameter
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=cb1c464d94f142c08b156c5beddade8b&timeFrame=day&targetCalories=${calories}`
    )
      // Parse the response as JSON
      .then((response) => response.json())
      // Update the mealData state with the fetched data
      .then((data) => {
        setMealData(data);
      })
      // Catch any errors and log them to the console
      .catch(() => {
        console.log("error");
      });
  }

  // Function to handle changes to the calories input field
  function handleCaloriesChange(e) {
    setCalories(e.target.value);
  }

  // Functions to handle changes to weight and height inputs
  function handleWeightChange(e) {
    setWeight(e.target.value);
  }

  function handleHeightChange(e) {
    setHeight(e.target.value);
  }

  // Function to calculate BMI based on weight and height
  function calculateBMI() {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2); // Calculate BMI and round to 2 decimal places
      setBmi(bmiValue); // Update the BMI state with the calculated value

      // Determine BMI category and suggested calorie intake
      if (bmiValue < 18.5) {
        setBmiResult("Underweight");
        setSuggestedCalories(2500); // Suggested higher calorie intake for weight gain
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiResult("Normal weight");
        setSuggestedCalories(2000); // Suggested moderate calorie intake for weight maintenance
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setBmiResult("Overweight");
        setSuggestedCalories(1800); // Suggested lower calorie intake for gradual weight loss
      } else {
        setBmiResult("Obesity");
        setSuggestedCalories(1500); // Suggested calorie intake for more aggressive weight loss
      }
    }
  }

  return (
    <div className="App">
      <section className="controls">
        {/* Input field for calories */}
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          value={calories}
          onChange={handleCaloriesChange} // call handleCaloriesChange when input changes
        />

        {/* BMI calculator inputs */}
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={handleWeightChange} // call handleWeightChange when input changes
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={handleHeightChange} // call handleHeightChange when input changes
        />

        {/* Button to fetch meal data */}
        <button onClick={getMealData}>Get Meal Plan</button>

        {/* Button to calculate BMI */}
        <button onClick={calculateBMI}>Calculate BMI</button>
      </section>

      {/* Display the calculated BMI, BMI category, and suggested calorie intake */}
      {bmi && (
        <div>
          <h2>Your BMI: {bmi}</h2>
          <p>BMI Category: {bmiResult}</p>
          <p>Suggested Daily Calorie Intake: {suggestedCalories} kcal</p>
        </div>
      )}

      {/* Render MealList component only if mealData is not null */}
      { mealData && <MealList mealData={mealData} /> }
    </div>
  );
}

// Export the App component as the default export
export default App;
