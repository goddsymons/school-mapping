# JKUAT Smart Campus Navigator

A modern, feature-rich campus navigation system for Jomo Kenyatta University of Agriculture and Technology (JKUAT).

## 🎯 Overview

This enhanced version of the JKUAT Smart Navigator provides students, staff, and visitors with an intuitive way to navigate the campus, manage class schedules, and report issues.

## ✨ Key Features

### 🗺️ Interactive Map
- **Comprehensive Coverage**: All major campus buildings, facilities, and landmarks
- **Dual View Modes**: Toggle between Street View and Satellite View
- **90+ Locations**: Academic buildings, hostels, dining halls, sports facilities, and more
- **Custom Markers**: Color-coded by category for easy identification

### 📍 Enhanced Location Services
- **High-Accuracy GPS**: Improved location tracking with accuracy indicators
- **Continuous Tracking**: Real-time position updates
- **Visual Feedback**: Pulsing marker shows your current location
- **Accuracy Circle**: Visual representation of GPS precision

### 🔍 Intelligent Search
- **Campus-Specific**: Searches only JKUAT locations
- **Smart Filtering**: Search by building name, category, or description
- **Live Results**: Instant search results as you type
- **Quick Categories**: One-tap access to Academic, Library, Hostels, and Sports facilities
- **Highlighted Matches**: Search terms highlighted in results

### 🧭 Turn-by-Turn Navigation
- **Walking Directions**: Direct path from your location to any campus building
- **Distance Calculation**: See how far your destination is
- **Visual Route**: Dashed line shows your path
- **Voice Guidance**: Optional voice announcements (can be enabled in settings)

### 📅 Class Schedule Management
- **Add Classes**: Store your weekly schedule with venue and time
- **Organized View**: Classes grouped by day
- **Quick Navigation**: Tap to navigate directly to class venue
- **Smart Reminders**: 15-minute notifications before class (browser must be open)

### 📝 Campus Issue Reporting
- **Multiple Categories**: Maintenance, Infrastructure, Security, Cleanliness, Lighting
- **Location Tagging**: Attach GPS coordinates to your report
- **Detailed Descriptions**: Provide comprehensive information about issues
- **Admin Dashboard**: All reports visible to campus administrators

### 🎨 Modern Design
- **Clean Interface**: Professional, intuitive user interface
- **Dark Mode**: Full dark theme support for night use
- **Responsive**: Works perfectly on phones, tablets, and desktops
- **Smooth Animations**: Polished transitions and micro-interactions
- **Accessibility**: Proper ARIA labels and keyboard navigation

### 🔐 Admin Dashboard
- **Location Management**: Add, edit, and remove campus locations
- **Alert Broadcasting**: Post campus-wide notifications and alerts
- **Report Monitoring**: View and manage user-submitted reports
- **Statistics**: Real-time counts of locations, alerts, and reports

## 📂 File Structure

```
jkuat-navigator/
├── index.html          # Main application page
├── admin.html          # Admin dashboard
├── login.html          # Admin login page
├── style.css           # Complete styling
├── app.js             # Main application logic
└── README.md          # This file
```

## 🚀 Setup Instructions

### Basic Setup (Local)

1. **Download Files**: Save all files to a folder on your computer

2. **Open in Browser**: 
   - Double-click `index.html` to open the main app
   - Or right-click → Open with → Your preferred browser

3. **Grant Permissions**:
   - Allow location access when prompted for GPS features
   - Allow notifications for class reminders (optional)

### Web Server Setup (Recommended)

For full functionality, especially GPS features, serve over HTTPS:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Then visit: http://localhost:8080
```

**Using PHP:**
```bash
php -S localhost:8000

# Then visit: http://localhost:8000
```

## 📚 Comprehensive Campus Data

The system includes detailed information for 90+ locations:

### Categories:
- **Academic Buildings** (16): Science Complex, Engineering Labs, Computer Labs, etc.
- **Administration** (6): Assembly Hall, Finance Office, Registrar, etc.
- **Student Services** (8): Library, Student Centre, Counseling, Career Services
- **Health Facilities** (3): Hospital, Pharmacy, Dental Clinic
- **Dining** (5): Multiple cafeterias across campus
- **Hostels** (10): Halls 1-9 plus Staff Quarters
- **Sports & Recreation** (7): Sports fields, swimming pool, gymnasium, tennis courts
- **Religious Centers** (2): Chapel and Prayer Room
- **Banking** (3): ATMs and bank branch
- **Shopping** (2): Bookshop and printing services
- **Transport** (4): Parking areas and public transport stops
- **Research Centers** (3): PAUSTI, Innovation Centre
- **Other Services**: Security, Post Office, Barber, Salon

## 🎮 User Guide

### Basic Navigation

1. **Find Your Location**:
   - Tap the GPS button (bottom right, blue icon)
   - Allow location access if prompted
   - Your position appears as a pulsing blue dot

2. **Search for Buildings**:
   - Tap the menu button (top left)
   - Type in the search box
   - Select from results to view on map

3. **Get Directions**:
   - Find your destination on the map
   - Click the marker
   - Tap "Get Directions" in the popup
   - Follow the green dashed line

4. **Quick Access**:
   - Use category buttons for fast filtering
   - Academic, Library, Hostels, Sports

### Class Schedule

1. **Add a Class**:
   - Open menu → Switch to "Timetable" tab
   - Enter unit code/name
   - Select day and time
   - Choose venue from dropdown
   - Tap "Add to Schedule"

2. **View Schedule**:
   - Classes organized by day
   - Tap navigate icon to go to class venue
   - Tap delete icon to remove class

3. **Reminders**:
   - Get notifications 15 minutes before class
   - Keep browser open for reminders

### Report Issues

1. **Submit a Report**:
   - Open menu → "Report" tab
   - Select issue type
   - Describe the problem
   - Tap "Tag Current Location" (finds your GPS coordinates)
   - Submit

### Settings

- **Dark Mode**: Toggle in Settings section for night use
- **Voice Guidance**: Enable for spoken navigation instructions
- **Map View**: Switch between Street and Satellite views

## 👨‍💼 Admin Guide

### Accessing Admin Panel

1. Click "Admin Portal" at bottom of sidebar
2. Login with credentials:
   - Username: `admin`
   - Password: `admin123`
3. Access granted to dashboard

### Admin Features

**Location Management**:
- Add new campus locations with coordinates
- Include name, category, and description
- Delete outdated locations

**Alert Broadcasting**:
- Post campus-wide notifications
- Types: Info, Construction, Event, Emergency
- Alerts appear at top of student app

**Report Monitoring**:
- View all user-submitted reports
- See issue type, description, and location
- Delete resolved reports

## 🔧 Customization

### Adding New Locations

In `app.js`, add to `JKUAT_DATABASE` array:

```javascript
{
    name: "New Building Name",
    category: "Academic",  // or Service, Housing, etc.
    lat: -1.0950,         // GPS latitude
    lng: 37.0130,         // GPS longitude
    description: "Building description"
}
```

### Changing Colors

In `style.css`, modify CSS variables:

```css
:root {
    --primary: #1B5E20;        /* Main green color */
    --primary-light: #2E7D32;  /* Lighter green */
    --accent: #4CAF50;         /* Accent color */
}
```

### Adjusting Map Center

In `app.js`, change:

```javascript
const JKUAT_COORDS = [-1.0950, 37.0130];  // [latitude, longitude]
```

## 🌐 Browser Compatibility

**Fully Supported**:
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers (iOS Safari, Chrome Mobile) ✅

**Required Features**:
- Geolocation API (for GPS)
- LocalStorage (for data persistence)
- Web Speech API (for voice guidance)

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive design adapts to screen size
- Swipe gestures supported
- Optimized for portrait and landscape modes
- Reduced data usage with efficient map tiles

## 🔒 Security & Privacy

- Location data stays on your device
- No tracking or analytics
- LocalStorage used for data persistence
- Admin panel requires authentication
- All data can be cleared via browser settings

## 🐛 Troubleshooting

**GPS Not Working:**
- Check browser location permissions
- Ensure you're using HTTPS or localhost
- Try refreshing the page
- Check if GPS is enabled on device

**Map Not Loading:**
- Check internet connection
- Clear browser cache
- Try different browser
- Verify Leaflet CDN is accessible

**Search Not Showing Results:**
- Check spelling
- Try partial words
- Use category filters
- Ensure data is loaded (check console)

**Admin Login Not Working:**
- Verify credentials (admin/admin123)
- Clear browser cache
- Check if JavaScript is enabled

## 🎯 Future Enhancements

Potential features for future versions:
- Offline map support with service workers
- Real-time bus tracking
- Indoor navigation for large buildings
- Photo uploads for issue reports
- Multi-language support
- Campus events calendar
- Study room booking
- Parking availability
- Weather integration

## 📄 License

This project is for educational purposes. JKUAT branding and campus data used with respect to the institution.

## 🤝 Contributing

To contribute:
1. Test thoroughly on multiple devices
2. Follow existing code style
3. Document any changes
4. Ensure all features work properly

## 💡 Tips for Best Experience

1. **Enable Location Services**: For accurate GPS positioning
2. **Use on Campus**: GPS works best with clear sky view
3. **Update Browser**: Keep browser updated for best performance
4. **Save to Home Screen**: On mobile for app-like experience
5. **Use WiFi**: For faster map loading
6. **Enable Notifications**: For class reminders

## 📞 Support

For issues or questions:
- Check the Troubleshooting section
- Review browser console for error messages
- Ensure all files are present and unmodified
- Verify internet connection

## 🙏 Acknowledgments

- OpenStreetMap for map tiles
- Leaflet.js for mapping library
- JKUAT for campus data
- Google Fonts for typography

---

**Version**: 2.0 Enhanced
**Last Updated**: January 2026
**Developed for**: JKUAT Community

Enjoy navigating the JKUAT campus with ease! 🎓📍
