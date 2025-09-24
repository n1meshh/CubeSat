
// Firebase Configuration (using your provided config)
const firebaseConfig = {
    apiKey: "AIzaSyBCShD8kmvxANWWl5jW3aOvoETwT29uMhA",
    authDomain: "dht11-5a7ee.firebaseapp.com",
    databaseURL: "https://dht11-5a7ee-default-rtdb.firebaseio.com",
    projectId: "dht11-5a7ee",
    storageBucket: "dht11-5a7ee.firebasestorage.app",
    messagingSenderId: "497372954718",
    appId: "1:497372954718:web:51ead8c25b68ea5717b4cf"
};

// Simulated data updates (replace with actual Firebase integration)
let sensorData = {
    bmpTemp: 30.7,
    dhtTemp: 29.5,
    humidity: 60.0,
    pressure: 863.6,
    slPressure: 1016.0,
    mqRaw: 734,
    altitude: 150
};

function updateDisplay() {
    // Update temperature readings with null checks
    const bmpTempEl = document.getElementById('bmpTemp');
    const dhtTempEl = document.getElementById('dhtTemp');
    const humidityEl = document.getElementById('humidity');
    const pressureEl = document.getElementById('pressure');
    const slPressureEl = document.getElementById('slPressure');
    const mqRawEl = document.getElementById('mqRaw');

    if (bmpTempEl) bmpTempEl.textContent = sensorData.bmpTemp.toFixed(1) + '°C';
    if (dhtTempEl) dhtTempEl.textContent = sensorData.dhtTemp.toFixed(1) + '°C';
    if (humidityEl) humidityEl.textContent = sensorData.humidity.toFixed(1) + '%';
    if (pressureEl) pressureEl.textContent = sensorData.pressure.toFixed(1) + ' hPa';
    if (slPressureEl) slPressureEl.textContent = sensorData.slPressure.toFixed(1) + ' hPa';
    if (mqRawEl) mqRawEl.textContent = sensorData.mqRaw;

    // Update comfort indicators based on values
    updateComfortStatus();
}

function updateComfortStatus() {
    // Temperature status
    const tempStatus = document.querySelector('.comfort-item:nth-child(1) .comfort-status');
    if (tempStatus) {
        if (sensorData.bmpTemp > 35 || sensorData.bmpTemp < -10) {
            tempStatus.className = 'comfort-status status-poor';
            tempStatus.textContent = 'Critical';
        } else if (sensorData.bmpTemp > 30 || sensorData.bmpTemp < 0) {
            tempStatus.className = 'comfort-status status-attention';
            tempStatus.textContent = 'Warning';
        } else {
            tempStatus.className = 'comfort-status status-optimal';
            tempStatus.textContent = 'Nominal';
        }
    }

    // Humidity status
    const humidityStatus = document.querySelector('.comfort-item:nth-child(2) .comfort-status');
    if (humidityStatus) {
        if (sensorData.humidity >= 30 && sensorData.humidity <= 80) {
            humidityStatus.className = 'comfort-status status-optimal';
            humidityStatus.textContent = 'Optimal';
        } else {
            humidityStatus.className = 'comfort-status status-attention';
            humidityStatus.textContent = sensorData.humidity > 80 ? 'High' : 'Low';
        }
    }
}

// Simulate real-time data updates
function simulateDataUpdates() {
    sensorData.bmpTemp += (Math.random() - 0.5) * 0.5;
    sensorData.dhtTemp += (Math.random() - 0.5) * 0.5;
    sensorData.humidity += (Math.random() - 0.5) * 2;
    sensorData.pressure += (Math.random() - 0.5) * 1;
    sensorData.slPressure += (Math.random() - 0.5) * 1;
    sensorData.mqRaw += Math.floor((Math.random() - 0.5) * 50);

    // Keep values within reasonable ranges
    sensorData.bmpTemp = Math.max(20, Math.min(35, sensorData.bmpTemp));
    sensorData.dhtTemp = Math.max(20, Math.min(35, sensorData.dhtTemp));
    sensorData.humidity = Math.max(30, Math.min(80, sensorData.humidity));
    sensorData.pressure = Math.max(800, Math.min(1100, sensorData.pressure));
    sensorData.slPressure = Math.max(1000, Math.min(1030, sensorData.slPressure));
    sensorData.mqRaw = Math.max(500, Math.min(1000, sensorData.mqRaw));

    updateDisplay();
}

// Initialize display after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();

    // Update every 2 seconds to simulate real-time data
    setInterval(simulateDataUpdates, 2000);

    // Add menu button event listener
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            alert('Menu functionality would be implemented here');
        });
    }

    // Connection status simulation
    let isConnected = true;
    setInterval(() => {
        // Simulate occasional connection issues
        if (Math.random() < 0.05) {
            isConnected = !isConnected;
            const realtimeStatus = document.querySelector('.realtime');
            const offlineStatus = document.querySelector('.offline');
            
            if (realtimeStatus && offlineStatus) {
                if (isConnected) {
                    realtimeStatus.style.display = 'inline-block';
                    offlineStatus.style.display = 'none';
                } else {
                    realtimeStatus.style.display = 'none';
                    offlineStatus.style.display = 'inline-block';
                }
            }
        }
    }, 5000);
});
