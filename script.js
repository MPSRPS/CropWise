
document.getElementById("cropForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  for (let key in data) {
    if (key !== "city") data[key] = parseFloat(data[key]);
  }

  const backendUrl = ENV.VITE_BACKEND_URL; // Use from env.js

  try {
    const response = await fetch(`${backendUrl}/api/predict-crop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    document.getElementById("result").innerHTML = `
      <h2>Recommended Crop: ${result.crop}</h2>
      <p>🌡 Temp: ${result.weather.temperature}°C</p>
      <p>💧 Humidity: ${result.weather.humidity}%</p>
      <p>📍 Location: ${result.weather.location}</p>
    `;
  } catch (err) {
    document.getElementById("result").innerHTML = "<p style='color:red;'>Failed to get crop recommendation.</p>";
  }
});
