const firebaseConfig = {
    apiKey: "AIzaSyBCShD8kmvxANWWl5jW3aOvoETwT29uMhA",
    authDomain: "dht11-5a7ee.firebaseapp.com",
    databaseURL: "https://dht11-5a7ee-default-rtdb.firebaseio.com",
    projectId: "dht11-5a7ee",
    storageBucket: "dht11-5a7ee.firebasestorage.app",
    messagingSenderId: "497372954718",
    appId: "1:497372954718:web:51ead8c25b68ea5717b4cf",
    measurementId: "G-YWBPRMCF1K"
  };
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const dataRef = database.ref("/environment");
  
  const container = document.getElementById("data-container");
  
  dataRef.on("value", (snapshot) => {
    const data = snapshot.val();
  
    if (data) {
      container.innerHTML = `
        <p><strong>🌡️ Temperature:</strong> ${data.dht_temp} °C</p>
        <p><strong>💧 Humidity:</strong> ${data.humidity} %</p>
        <p><strong>📡 Pressure:</strong> ${data.pressure} hPa</p>
        <p><strong>🛰️ Altitude:</strong> ${data.altitude} m</p>
      `;
    } else {
      container.innerHTML = "🚫 No data available.";
    }
  });
  