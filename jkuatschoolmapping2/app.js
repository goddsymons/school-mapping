// ====================================
// JKUAT SMART CAMPUS NAVIGATOR
// Enhanced Version with Comprehensive Data
// ====================================

// Configuration
const JKUAT_COORDS = [-1.0950, 37.0130];
let map, userMarker, routeLine, routingControl, locationWatchId;
let streetLayer, satLayer, currentLayer = 'street';
let userPosition = null;
let locationAccuracy = null;

// Comprehensive JKUAT Campus Database
const JKUAT_DATABASE = [
    // ===== MAIN ENTRANCES =====
    { name: "Main Gate A (Administration)", category: "Entrance", lat: -1.0898, lng: 37.0105, description: "Primary campus entrance" },
    { name: "Gate B (Service Entrance)", category: "Entrance", lat: -1.0935, lng: 37.0080, description: "Service vehicles entrance" },
    { name: "Gate C (High Point)", category: "Entrance", lat: -1.1005, lng: 37.0145, description: "Eastern campus entrance" },
    { name: "Gate D (Hostels)", category: "Entrance", lat: -1.0985, lng: 37.0135, description: "Residential area entrance" },
    
    // ===== ACADEMIC BUILDINGS =====
    { name: "Science Complex (SCC)", category: "Academic", lat: -1.0938, lng: 37.0125, description: "Main science lectures and laboratories" },
    { name: "New Science Complex (NSC)", category: "Academic", lat: -1.0942, lng: 37.0132, description: "Modern science facilities" },
    { name: "COHES Building (Health Sciences)", category: "Academic", lat: -1.0945, lng: 37.0145, description: "College of Health Sciences" },
    { name: "Engineering Labs Block (ELB)", category: "Academic", lat: -1.0955, lng: 37.0150, description: "Engineering workshops and labs" },
    { name: "Architecture Studios", category: "Academic", lat: -1.0962, lng: 37.0155, description: "Design and architecture studios" },
    { name: "Computer Labs Building (CLB)", category: "Academic", lat: -1.0930, lng: 37.0120, description: "IT and computer science labs" },
    { name: "Business Studies Building", category: "Academic", lat: -1.0925, lng: 37.0140, description: "Business and economics faculty" },
    { name: "Education Block", category: "Academic", lat: -1.0968, lng: 37.0138, description: "School of Education" },
    { name: "Agriculture Block", category: "Academic", lat: -1.0958, lng: 37.0165, description: "Agricultural sciences" },
    { name: "Horticulture Department", category: "Academic", lat: -1.0972, lng: 37.0170, description: "Horticulture labs and greenhouses" },
    { name: "Biotechnology Building", category: "Academic", lat: -1.0948, lng: 37.0152, description: "Biotechnology research center" },
    { name: "Lecture Theatre Complex (LT1-LT6)", category: "Academic", lat: -1.0940, lng: 37.0128, description: "Main lecture halls" },
    
    // ===== ADMINISTRATION =====
    { name: "Assembly Hall", category: "Admin", lat: -1.0950, lng: 37.0130, description: "Main assembly and events hall" },
    { name: "Administration Block", category: "Admin", lat: -1.0945, lng: 37.0127, description: "Vice Chancellor's office" },
    { name: "Finance Office", category: "Admin", lat: -1.0948, lng: 37.0128, description: "Accounts and fees payments" },
    { name: "Admissions Office", category: "Admin", lat: -1.0946, lng: 37.0129, description: "Student admissions" },
    { name: "Registrar's Office", category: "Admin", lat: -1.0947, lng: 37.0126, description: "Academic records" },
    { name: "Examinations Office", category: "Admin", lat: -1.0949, lng: 37.0131, description: "Exams coordination" },
    
    // ===== LIBRARY & LEARNING RESOURCES =====
    { name: "Main Library", category: "Service", lat: -1.0960, lng: 37.0140, description: "Central library with study areas" },
    { name: "Library Annex", category: "Service", lat: -1.0962, lng: 37.0142, description: "Additional study space" },
    { name: "ICT Center", category: "Service", lat: -1.0935, lng: 37.0122, description: "Computer access and IT support" },
    { name: "E-Learning Center", category: "Service", lat: -1.0952, lng: 37.0135, description: "Online learning resources" },
    
    // ===== STUDENT SERVICES =====
    { name: "Student Centre", category: "Service", lat: -1.0965, lng: 37.0140, description: "Student affairs and services" },
    { name: "Dean of Students Office", category: "Service", lat: -1.0966, lng: 37.0139, description: "Student welfare office" },
    { name: "Counseling Center", category: "Service", lat: -1.0964, lng: 37.0141, description: "Student counseling services" },
    { name: "Career Services", category: "Service", lat: -1.0967, lng: 37.0138, description: "Career guidance and placement" },
    
    // ===== HEALTH FACILITIES =====
    { name: "JKUAT Hospital", category: "Health", lat: -1.0975, lng: 37.0125, description: "Campus medical center" },
    { name: "Pharmacy", category: "Health", lat: -1.0974, lng: 37.0126, description: "Campus pharmacy" },
    { name: "Dental Clinic", category: "Health", lat: -1.0976, lng: 37.0124, description: "Dental services" },
    
    // ===== DINING & CAFETERIAS =====
    { name: "Main Cafeteria", category: "Dining", lat: -1.0955, lng: 37.0133, description: "Central dining hall" },
    { name: "Cafeteria 2 (Science Complex)", category: "Dining", lat: -1.0941, lng: 37.0127, description: "Science block cafeteria" },
    { name: "Cafeteria 3 (Engineering)", category: "Dining", lat: -1.0957, lng: 37.0148, description: "Engineering block cafeteria" },
    { name: "Coffee Shop", category: "Dining", lat: -1.0951, lng: 37.0132, description: "Coffee and snacks" },
    { name: "Hostels Cafeteria", category: "Dining", lat: -1.0988, lng: 37.0137, description: "Residential dining" },
    
    // ===== STUDENT HOSTELS =====
    { name: "Hall 1 (Gents)", category: "Housing", lat: -1.0982, lng: 37.0130, description: "Male student hostel" },
    { name: "Hall 2 (Ladies)", category: "Housing", lat: -1.0984, lng: 37.0132, description: "Female student hostel" },
    { name: "Hall 3 (Gents)", category: "Housing", lat: -1.0986, lng: 37.0134, description: "Male student hostel" },
    { name: "Hall 4 (Ladies)", category: "Housing", lat: -1.0988, lng: 37.0136, description: "Female student hostel" },
    { name: "Hall 5 (Mixed)", category: "Housing", lat: -1.0990, lng: 37.0138, description: "Mixed student hostel" },
    { name: "Hall 6", category: "Housing", lat: -1.0990, lng: 37.0135, description: "Student hostel" },
    { name: "Hall 7", category: "Housing", lat: -1.0995, lng: 37.0140, description: "Student hostel" },
    { name: "Hall 8", category: "Housing", lat: -1.0992, lng: 37.0142, description: "Student hostel" },
    { name: "Hall 9 (Postgraduate)", category: "Housing", lat: -1.0997, lng: 37.0145, description: "Graduate student residence" },
    { name: "Staff Quarters", category: "Housing", lat: -1.1000, lng: 37.0150, description: "Faculty housing" },
    
    // ===== SPORTS & RECREATION =====
    { name: "Main Sports Field", category: "Recreation", lat: -1.0980, lng: 37.0150, description: "Football and athletics" },
    { name: "Swimming Pool Complex", category: "Recreation", lat: -1.0970, lng: 37.0155, description: "Olympic-size pool" },
    { name: "Indoor Sports Hall", category: "Recreation", lat: -1.0978, lng: 37.0148, description: "Basketball, volleyball, badminton" },
    { name: "Tennis Courts", category: "Recreation", lat: -1.0973, lng: 37.0152, description: "Tennis facilities" },
    { name: "Gymnasium", category: "Recreation", lat: -1.0976, lng: 37.0150, description: "Fitness center" },
    { name: "Rugby Field", category: "Recreation", lat: -1.0985, lng: 37.0155, description: "Rugby pitch" },
    { name: "Basketball Courts", category: "Recreation", lat: -1.0977, lng: 37.0149, description: "Outdoor basketball" },
    
    // ===== RELIGIOUS CENTERS =====
    { name: "University Chapel", category: "Religious", lat: -1.0963, lng: 37.0134, description: "Christian worship center" },
    { name: "Muslim Prayer Room", category: "Religious", lat: -1.0964, lng: 37.0135, description: "Islamic prayer facilities" },
    
    // ===== BANKS & FINANCIAL SERVICES =====
    { name: "Equity Bank ATM", category: "Banking", lat: -1.0953, lng: 37.0131, description: "ATM services" },
    { name: "KCB Bank Branch", category: "Banking", lat: -1.0954, lng: 37.0130, description: "Banking services" },
    { name: "Co-operative Bank ATM", category: "Banking", lat: -1.0952, lng: 37.0132, description: "ATM services" },
    
    // ===== BOOKSHOPS & SUPPLIES =====
    { name: "University Bookshop", category: "Shopping", lat: -1.0956, lng: 37.0136, description: "Books and stationery" },
    { name: "Printing & Photocopying Services", category: "Shopping", lat: -1.0957, lng: 37.0137, description: "Document services" },
    
    // ===== TRANSPORT & PARKING =====
    { name: "Main Parking Area", category: "Transport", lat: -1.0920, lng: 37.0115, description: "Visitor and staff parking" },
    { name: "Student Parking", category: "Transport", lat: -1.0970, lng: 37.0145, description: "Student vehicle parking" },
    { name: "Bus Stop (Main)", category: "Transport", lat: -1.0900, lng: 37.0108, description: "Public transport pickup" },
    { name: "Matatu Stage", category: "Transport", lat: -1.0902, lng: 37.0110, description: "Local transport" },
    
    // ===== RESEARCH CENTERS =====
    { name: "PAUSTI (Pan African University)", category: "Research", lat: -1.0932, lng: 37.0158, description: "Space science institute" },
    { name: "Innovation & Technology Transfer Centre", category: "Research", lat: -1.0928, lng: 37.0152, description: "Innovation hub" },
    { name: "Research & Innovation Directorate", category: "Research", lat: -1.0951, lng: 37.0134, description: "Research coordination" },
    
    // ===== OTHER FACILITIES =====
    { name: "Security Office", category: "Security", lat: -1.0897, lng: 37.0106, description: "Campus security HQ" },
    { name: "Post Office", category: "Service", lat: -1.0954, lng: 37.0133, description: "Postal services" },
    { name: "Barber Shop", category: "Service", lat: -1.0989, lng: 37.0139, description: "Grooming services" },
    { name: "Salon", category: "Service", lat: -1.0990, lng: 37.0138, description: "Hair and beauty" }
];

// Data Storage
let locations = [];
let alerts = [];
let reports = [];
let timetable = [];
let voiceEnabled = false;

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    checkTheme();
    
    if (document.getElementById('map')) {
        initMap();
        initVenueDropdown();
        renderTimetable();
        checkAlerts();
        setInterval(checkTimetableReminders, 60000);
    }
});

// ====================================
// DATA MANAGEMENT
// ====================================

function loadData() {
    const storedLocs = localStorage.getItem('jkuat_places');
    
    if (storedLocs) {
        const parsed = JSON.parse(storedLocs);
        // Merge with database to ensure we have all locations
        const existingNames = parsed.map(l => l.name);
        const newLocations = JKUAT_DATABASE.filter(l => !existingNames.includes(l.name));
        locations = [...parsed, ...newLocations];
    } else {
        locations = [...JKUAT_DATABASE];
    }
    
    localStorage.setItem('jkuat_places', JSON.stringify(locations));
    alerts = JSON.parse(localStorage.getItem('jkuat_alerts') || '[]');
    reports = JSON.parse(localStorage.getItem('jkuat_reports') || '[]');
    timetable = JSON.parse(localStorage.getItem('jkuat_timetable') || '[]');
}

// ====================================
// MAP INITIALIZATION & CONTROLS
// ====================================

function initMap() {
    // Define map layers
    streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
    });

    satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19
    });

    // Create map
    map = L.map('map', {
        center: JKUAT_COORDS,
        zoom: 16,
        layers: [streetLayer],
        zoomControl: false
    });

    // Add zoom control to bottom right
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // Add all location markers
    addLocationMarkers();
}

function addLocationMarkers() {
    // Create custom icons for different categories
    const categoryIcons = {
        'Academic': createIcon('#2E7D32'),
        'Admin': createIcon('#1565C0'),
        'Service': createIcon('#F57C00'),
        'Health': createIcon('#C62828'),
        'Housing': createIcon('#6A1B9A'),
        'Recreation': createIcon('#00838F'),
        'Dining': createIcon('#EF6C00'),
        'Entrance': createIcon('#424242'),
        'Religious': createIcon('#5D4037'),
        'Banking': createIcon('#00695C'),
        'Shopping': createIcon('#AD1457'),
        'Transport': createIcon('#37474F'),
        'Research': createIcon('#0277BD'),
        'Security': createIcon('#B71C1C')
    };

    locations.forEach(loc => {
        const icon = categoryIcons[loc.category] || categoryIcons['Service'];
        
        const marker = L.marker([loc.lat, loc.lng], { icon: icon })
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <h4>${loc.name}</h4>
                    <span class="popup-category">${loc.category}</span>
                    ${loc.description ? `<p class="popup-desc">${loc.description}</p>` : ''}
                    <button onclick="navigate(${loc.lat}, ${loc.lng}, '${loc.name.replace(/'/g, "\\'")}')" class="popup-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                        Get Directions
                    </button>
                </div>
            `);
    });
}

function createIcon(color) {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });
}

// ====================================
// LOCATION TRACKING (IMPROVED)
// ====================================

function locateUser() {
    if (!navigator.geolocation) {
        showNotification('GPS not supported by your browser', 'error');
        return;
    }

    // Show loading state
    showNotification('Locating...', 'info');
    document.getElementById('locationIndicator').classList.remove('hidden');

    // Use high accuracy GPS
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        options
    );

    // Start continuous tracking
    if (locationWatchId) {
        navigator.geolocation.clearWatch(locationWatchId);
    }
    
    locationWatchId = navigator.geolocation.watchPosition(
        updateUserPosition,
        handleLocationError,
        options
    );
}

function handleLocationSuccess(position) {
    const { latitude, longitude, accuracy } = position.coords;
    
    userPosition = { lat: latitude, lng: longitude };
    locationAccuracy = accuracy;

    // Remove old marker
    if (userMarker) {
        map.removeLayer(userMarker);
    }

    // Create pulsing marker for user location
    const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: `
            <div class="user-marker-outer">
                <div class="user-marker-inner"></div>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    userMarker = L.marker([latitude, longitude], { icon: userIcon })
        .addTo(map)
        .bindPopup(`
            <div class="map-popup">
                <h4>Your Location</h4>
                <p class="popup-desc">Accuracy: ±${Math.round(accuracy)}m</p>
            </div>
        `);

    // Add accuracy circle
    L.circle([latitude, longitude], {
        color: '#2196F3',
        fillColor: '#2196F3',
        fillOpacity: 0.1,
        radius: accuracy
    }).addTo(map);

    map.setView([latitude, longitude], 17);
    showNotification('Location found!', 'success');
    
    if (voiceEnabled) {
        speak('Your location has been found');
    }
}

function updateUserPosition(position) {
    const { latitude, longitude, accuracy } = position.coords;
    
    userPosition = { lat: latitude, lng: longitude };
    locationAccuracy = accuracy;

    if (userMarker) {
        userMarker.setLatLng([latitude, longitude]);
    }
}

function handleLocationError(error) {
    document.getElementById('locationIndicator').classList.add('hidden');
    
    let message = 'Could not get your location. ';
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message += 'Please enable location permissions.';
            break;
        case error.POSITION_UNAVAILABLE:
            message += 'Location information unavailable.';
            break;
        case error.TIMEOUT:
            message += 'Location request timed out.';
            break;
        default:
            message += 'An unknown error occurred.';
    }
    
    showNotification(message, 'error');
}

// ====================================
// NAVIGATION & ROUTING
// ====================================

routingControl = null;

function navigate(destLat, destLng, name) {
    if (!userPosition) {
        showNotification('Please find your location first', 'warning');
        setTimeout(() => locateUser(), 500);
        return;
    }

    // Remove old route and routing control
    if (routeLine) {
        map.removeLayer(routeLine);
        routeLine = null;
    }
    
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }

    // Calculate straight-line distance for reference
    const straightDistance = calculateDistance(
        userPosition.lat,
        userPosition.lng,
        destLat,
        destLng
    );

    // Check if Leaflet Routing Machine is available
    if (typeof L.Routing !== 'undefined' && L.Routing.control) {
        // Use routing for road-based directions
        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(userPosition.lat, userPosition.lng),
                L.latLng(destLat, destLng)
            ],
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1',
                profile: 'foot' // Walking route
            }),
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
            lineOptions: {
                styles: [
                    {
                        color: '#2E7D32',
                        opacity: 0.8,
                        weight: 6
                    }
                ],
                extendToWaypoints: true,
                missingRouteTolerance: 0
            },
            createMarker: function() { return null; }, // Don't show default markers
            show: true,
            collapsible: true,
            containerClassName: 'routing-container'
        }).addTo(map);

        // Show clear route button
        const clearBtn = document.getElementById('clearRouteBtn');
        if (clearBtn) clearBtn.style.display = 'flex';

        // Listen for route found
        routingControl.on('routesfound', function(e) {
            const routes = e.routes;
            const summary = routes[0].summary;
            const distance = Math.round(summary.totalDistance);
            const time = Math.round(summary.totalTime / 60);
            
            showNotification(
                `Route to ${name}: ${distance}m walking distance (${time} min)`,
                'success'
            );
            
            if (voiceEnabled) {
                speak(`Route found to ${name}. Walking distance is ${distance} meters, approximately ${time} minutes.`);
            }
        });

        // Listen for routing errors
        routingControl.on('routingerror', function(e) {
            console.error('Routing error:', e);
            // Fall back to straight line if routing fails
            createStraightLineRoute(destLat, destLng, name, straightDistance);
        });

    } else {
        // Fallback to straight line if routing library not available
        createStraightLineRoute(destLat, destLng, name, straightDistance);
    }

    // Close sidebar on mobile
    if (window.innerWidth < 768) {
        toggleSidebar();
    }
}

// Fallback function for straight-line routing
function createStraightLineRoute(destLat, destLng, name, distance) {
    routeLine = L.polyline(
        [[userPosition.lat, userPosition.lng], [destLat, destLng]],
        {
            color: '#2E7D32',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 10',
            lineJoin: 'round'
        }
    ).addTo(map);

    // Fit bounds with padding
    map.fitBounds(routeLine.getBounds(), {
        padding: [80, 80]
    });

    // Show clear route button
    const clearBtn = document.getElementById('clearRouteBtn');
    if (clearBtn) clearBtn.style.display = 'flex';

    showNotification(
        `Direct path to ${name} (${distance}m as the crow flies)`,
        'info'
    );

    if (voiceEnabled) {
        speak(`Showing direct path to ${name}. Distance is approximately ${distance} meters.`);
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
}

// ====================================
// SEARCH FUNCTIONALITY (ENHANCED)
// ====================================

function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    const clearBtn = document.querySelector('.clear-search');
    
    if (query.length === 0) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('active');
        clearBtn.classList.add('hidden');
        return;
    }
    
    clearBtn.classList.remove('hidden');

    if (query.length < 2) {
        resultsContainer.innerHTML = '<div class="search-hint">Type at least 2 characters...</div>';
        resultsContainer.classList.add('active');
        return;
    }

    // Search through locations
    const matches = locations.filter(loc => {
        const nameMatch = loc.name.toLowerCase().includes(query);
        const categoryMatch = loc.category.toLowerCase().includes(query);
        const descMatch = loc.description && loc.description.toLowerCase().includes(query);
        return nameMatch || categoryMatch || descMatch;
    });

    // Sort by relevance (exact matches first)
    matches.sort((a, b) => {
        const aExact = a.name.toLowerCase().startsWith(query);
        const bExact = b.name.toLowerCase().startsWith(query);
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        return a.name.localeCompare(b.name);
    });

    if (matches.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <p>No locations found for "${query}"</p>
                <small>Try searching for buildings, departments, or facilities</small>
            </div>
        `;
        resultsContainer.classList.add('active');
        return;
    }

    // Display results
    resultsContainer.innerHTML = matches.map(loc => `
        <div class="result-item" onclick="selectLocation(${loc.lat}, ${loc.lng}, '${loc.name.replace(/'/g, "\\'")}')">
            <div class="result-info">
                <div class="result-name">${highlightMatch(loc.name, query)}</div>
                <div class="result-meta">
                    <span class="result-category">${loc.category}</span>
                    ${loc.description ? `<span class="result-desc">${loc.description}</span>` : ''}
                </div>
            </div>
            <svg class="result-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
            </svg>
        </div>
    `).join('');
    
    resultsContainer.classList.add('active');
}

function highlightMatch(text, query) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    
    return text.substring(0, index) +
           '<mark>' + text.substring(index, index + query.length) + '</mark>' +
           text.substring(index + query.length);
}

function selectLocation(lat, lng, name) {
    map.flyTo([lat, lng], 18, {
        duration: 1
    });
    
    // Find and open popup
    map.eachLayer(layer => {
        if (layer.getLatLng && Math.abs(layer.getLatLng().lat - lat) < 0.0001) {
            layer.openPopup();
        }
    });
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
        toggleSidebar();
    }
    
    // Clear search
    clearSearch();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchResults').classList.remove('active');
    document.querySelector('.clear-search').classList.add('hidden');
}

function filterByCategory(category) {
    const matches = locations.filter(loc => loc.category === category);
    
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = `
        <div class="category-header">${category} Buildings</div>
        ${matches.map(loc => `
            <div class="result-item" onclick="selectLocation(${loc.lat}, ${loc.lng}, '${loc.name.replace(/'/g, "\\'")}')">
                <div class="result-info">
                    <div class="result-name">${loc.name}</div>
                    ${loc.description ? `<div class="result-meta"><span class="result-desc">${loc.description}</span></div>` : ''}
                </div>
                <svg class="result-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                </svg>
            </div>
        `).join('')}
    `;
    resultsContainer.classList.add('active');
}

// ====================================
// UI CONTROLS
// ====================================

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`tab-${tabId}`).classList.add('active');
}

function toggleMapLayer() {
    if (currentLayer === 'street') {
        map.removeLayer(streetLayer);
        map.addLayer(satLayer);
        currentLayer = 'sat';
        showNotification('Switched to Satellite View', 'info');
    } else {
        map.removeLayer(satLayer);
        map.addLayer(streetLayer);
        currentLayer = 'street';
        showNotification('Switched to Street View', 'info');
    }
}

function clearRoute() {
    if (routeLine) {
        map.removeLayer(routeLine);
        routeLine = null;
    }
    
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
    
    // Hide clear route button
    const clearBtn = document.getElementById('clearRouteBtn');
    if (clearBtn) clearBtn.style.display = 'none';
    
    showNotification('Route cleared', 'info');
}

// ====================================
// TIMETABLE MANAGEMENT
// ====================================

function initVenueDropdown() {
    const select = document.getElementById('classVenue');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select Venue</option>';
    
    // Filter for academic buildings only
    const academicBuildings = locations
        .filter(loc => loc.category === 'Academic')
        .sort((a, b) => a.name.localeCompare(b.name));
    
    academicBuildings.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc.name;
        option.textContent = loc.name;
        select.appendChild(option);
    });
}

function addClass(e) {
    e.preventDefault();
    
    const classData = {
        id: Date.now(),
        name: document.getElementById('className').value,
        day: document.getElementById('classDay').value,
        time: document.getElementById('classTime').value,
        venue: document.getElementById('classVenue').value
    };
    
    timetable.push(classData);
    localStorage.setItem('jkuat_timetable', JSON.stringify(timetable));
    
    renderTimetable();
    e.target.reset();
    showNotification('Class added to schedule', 'success');
}

function renderTimetable() {
    const container = document.getElementById('timetableList');
    if (!container) return;
    
    if (timetable.length === 0) {
        container.innerHTML = '<div class="empty-state">No classes scheduled yet</div>';
        return;
    }
    
    // Group by day
    const grouped = {};
    timetable.forEach(cls => {
        if (!grouped[cls.day]) grouped[cls.day] = [];
        grouped[cls.day].push(cls);
    });
    
    // Sort each day by time
    Object.keys(grouped).forEach(day => {
        grouped[day].sort((a, b) => a.time.localeCompare(b.time));
    });
    
    // Render
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    container.innerHTML = days.map(day => {
        if (!grouped[day]) return '';
        return `
            <div class="day-group">
                <h4 class="day-header">${day}</h4>
                ${grouped[day].map(cls => `
                    <div class="class-item">
                        <div class="class-info">
                            <div class="class-name">${cls.name}</div>
                            <div class="class-details">
                                <span class="class-time">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    ${cls.time}
                                </span>
                                <span class="class-venue">${cls.venue}</span>
                            </div>
                        </div>
                        <div class="class-actions">
                            <button onclick="navigateToVenue('${cls.venue}')" class="icon-btn" title="Navigate">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </button>
                            <button onclick="removeClass(${cls.id})" class="icon-btn" title="Delete">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');
}

function navigateToVenue(venueName) {
    const venue = locations.find(loc => loc.name === venueName);
    if (venue) {
        selectLocation(venue.lat, venue.lng, venue.name);
        switchTab('search');
    }
}

function removeClass(id) {
    if (confirm('Remove this class from your schedule?')) {
        timetable = timetable.filter(cls => cls.id !== id);
        localStorage.setItem('jkuat_timetable', JSON.stringify(timetable));
        renderTimetable();
        showNotification('Class removed', 'info');
    }
}

function checkTimetableReminders() {
    const now = new Date();
    const currentDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    timetable.forEach(cls => {
        if (cls.day === currentDay) {
            const [hours, minutes] = cls.time.split(':').map(Number);
            const classTime = hours * 60 + minutes;
            const timeDiff = classTime - currentTime;
            
            // Remind 15 minutes before
            if (timeDiff === 15) {
                showNotification(`Class starting in 15 minutes: ${cls.name} at ${cls.venue}`, 'warning');
                if (voiceEnabled) {
                    speak(`Reminder: ${cls.name} starts in 15 minutes at ${cls.venue}`);
                }
            }
        }
    });
}

// ====================================
// REPORT SUBMISSION
// ====================================

function tagLocation() {
    if (!userPosition) {
        showNotification('Please find your location first', 'warning');
        locateUser();
        return;
    }
    
    document.getElementById('reportLat').value = userPosition.lat;
    document.getElementById('reportLng').value = userPosition.lng;
    document.getElementById('locationStatus').textContent = `Location tagged (±${Math.round(locationAccuracy)}m accuracy)`;
    document.getElementById('locationStatus').classList.add('tagged');
    showNotification('Location tagged successfully', 'success');
}

function submitReport(e) {
    e.preventDefault();
    
    const report = {
        id: Date.now(),
        type: document.getElementById('issueType').value,
        description: document.getElementById('issueDesc').value,
        lat: document.getElementById('reportLat').value,
        lng: document.getElementById('reportLng').value,
        date: new Date().toLocaleString()
    };
    
    reports.push(report);
    localStorage.setItem('jkuat_reports', JSON.stringify(reports));
    
    showNotification('Report submitted successfully! Thank you for helping improve our campus.', 'success');
    e.target.reset();
    document.getElementById('locationStatus').textContent = 'Location not tagged';
    document.getElementById('locationStatus').classList.remove('tagged');
    
    if (voiceEnabled) {
        speak('Report submitted successfully');
    }
}

// ====================================
// ALERTS & NOTIFICATIONS
// ====================================

function checkAlerts() {
    if (alerts.length > 0) {
        const latest = alerts[alerts.length - 1];
        const banner = document.getElementById('alertBanner');
        document.getElementById('alertText').textContent = latest.msg;
        banner.classList.remove('hidden');
        banner.setAttribute('data-type', latest.type);
    }
}

function closeAlert() {
    document.getElementById('alertBanner').classList.add('hidden');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${type === 'success' ? '<polyline points="20 6 9 17 4 12"/>' : 
              type === 'error' ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' :
              type === 'warning' ? '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>' :
              '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'}
        </svg>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ====================================
// SETTINGS & PREFERENCES
// ====================================

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    showNotification(`Switched to ${newTheme} mode`, 'info');
}

function checkTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.checked = savedTheme === 'dark';
}

function toggleVoice() {
    voiceEnabled = document.getElementById('voiceToggle').checked;
    localStorage.setItem('voiceEnabled', voiceEnabled);
    showNotification(`Voice guidance ${voiceEnabled ? 'enabled' : 'disabled'}`, 'info');
}

function speak(text) {
    if ('speechSynthesis' in window && voiceEnabled) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
}

// ====================================
// UTILITY FUNCTIONS
// ====================================

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth < 768 && 
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        toggleSidebar();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (locationWatchId) {
        navigator.geolocation.clearWatch(locationWatchId);
    }
});