// Restaurant API Server
// Deploy this to Vercel, Netlify Functions, or any Node.js hosting service

const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "The Golden Spoon",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
    rating: 4.5,
    totalReviews: 324,
    percentageOff: 20,
    timing: {
      monday: "9:00 AM - 10:00 PM",
      tuesday: "9:00 AM - 10:00 PM",
      wednesday: "9:00 AM - 10:00 PM",
      thursday: "9:00 AM - 10:00 PM",
      friday: "9:00 AM - 11:00 PM",
      saturday: "9:00 AM - 11:00 PM",
      sunday: "10:00 AM - 9:00 PM"
    },
    cuisine: ["Italian", "Mediterranean"],
    phone: "+1-555-0123",
    email: "mayurranshinge08@gmail.com",
    amenities: ["Free WiFi", "Outdoor Seating", "Parking Available", "Delivery", "Takeout"],
    location: {
      address: "123 Main Street, Downtown",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    }
  },
  {
    id: 2,
    name: "Spice Junction",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=300&fit=crop",
    rating: 4.2,
    totalReviews: 189,
    percentageOff: 15,
    timing: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 10:00 PM",
      saturday: "11:00 AM - 10:00 PM",
      sunday: "12:00 PM - 8:00 PM"
    },
    cuisine: ["Indian", "Asian"],
    phone: "+1-555-0456",
    email: "contact@spicejunction.com",
    amenities: ["Air Conditioning", "Family Friendly", "Vegetarian Options", "Delivery"],
    location: {
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      }
    }
  },
  {
    id: 3,
    name: "Ocean Breeze Café",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop",
    rating: 4.7,
    totalReviews: 412,
    percentageOff: 25,
    timing: {
      monday: "7:00 AM - 3:00 PM",
      tuesday: "7:00 AM - 3:00 PM",
      wednesday: "7:00 AM - 3:00 PM",
      thursday: "7:00 AM - 3:00 PM",
      friday: "7:00 AM - 4:00 PM",
      saturday: "8:00 AM - 4:00 PM",
      sunday: "8:00 AM - 3:00 PM"
    },
    cuisine: ["American", "Seafood", "Breakfast"],
    phone: "+1-555-0789",
    email: "girishkor5@gmail.com",
    amenities: ["Ocean View", "Pet Friendly", "Free WiFi", "Brunch", "Fresh Seafood"],
    location: {
      address: "789 Coastal Highway",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      coordinates: {
        latitude: 25.7617,
        longitude: -80.1918
      }
    }
  }
];

// Sample booking data
const bookings = [
  {
    id: 1,
    userName: "John Smith",
    phoneNumber: "+1-555-1234",
    totalPeople: 4,
    tableBookingTime: "2025-06-02T19:00:00Z",
    restaurantId: 1,
    status: "confirmed",
    specialRequests: "Window seat preferred",
    createdAt: "2025-06-01T10:30:00Z"
  },
  {
    id: 2,
    userName: "Emily Johnson",
    phoneNumber: "+1-555-5678",
    totalPeople: 2,
    tableBookingTime: "2025-06-03T20:30:00Z",
    restaurantId: 2,
    status: "pending",
    specialRequests: "Anniversary dinner",
    createdAt: "2025-06-01T14:15:00Z"
  },
  {
    id: 3,
    userName: "Michael Davis",
    phoneNumber: "+1-555-9012",
    totalPeople: 6,
    tableBookingTime: "2025-06-04T18:00:00Z",
    restaurantId: 3,
    status: "confirmed",
    specialRequests: "Birthday celebration",
    createdAt: "2025-06-01T16:45:00Z"
  }
];

// GET all restaurants
app.get('/api/restaurants', (req, res) => {
  try {
    res.json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET single restaurant by ID
app.get('/api/restaurants/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const restaurant = restaurants.find(r => r.id === id);
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }
    
    res.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET restaurants by cuisine
app.get('/api/restaurants/cuisine/:cuisine', (req, res) => {
  try {
    const cuisine = req.params.cuisine.toLowerCase();
    const filteredRestaurants = restaurants.filter(r => 
      r.cuisine.some(c => c.toLowerCase().includes(cuisine))
    );
    
    res.json({
      success: true,
      count: filteredRestaurants.length,
      data: filteredRestaurants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET restaurants by city
app.get('/api/restaurants/city/:city', (req, res) => {
  try {
    const city = req.params.city.toLowerCase();
    const filteredRestaurants = restaurants.filter(r => 
      r.location.city.toLowerCase() === city
    );
    
    res.json({
      success: true,
      count: filteredRestaurants.length,
      data: filteredRestaurants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET all bookings
app.get('/api/bookings', (req, res) => {
  try {
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET single booking by ID
app.get('/api/bookings/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const booking = bookings.find(b => b.id === id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET bookings by restaurant ID
app.get('/api/bookings/restaurant/:restaurantId', (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);
    const restaurantBookings = bookings.filter(b => b.restaurantId === restaurantId);
    
    res.json({
      success: true,
      count: restaurantBookings.length,
      data: restaurantBookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// POST create new booking
app.post('/api/bookings', (req, res) => {
  try {
    const { userName, phoneNumber, totalPeople, tableBookingTime, restaurantId, specialRequests } = req.body;
    
    // Validation
    if (!userName || !phoneNumber || !totalPeople || !tableBookingTime || !restaurantId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userName, phoneNumber, totalPeople, tableBookingTime, restaurantId'
      });
    }
    
    // Check if restaurant exists
    const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }
    
    // Create new booking
    const newBooking = {
      id: bookings.length + 1,
      userName,
      phoneNumber,
      totalPeople: parseInt(totalPeople),
      tableBookingTime,
      restaurantId: parseInt(restaurantId),
      status: "pending",
      specialRequests: specialRequests || "",
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET booking with restaurant details
app.get('/api/bookings/:id/details', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const booking = bookings.find(b => b.id === id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    const restaurant = restaurants.find(r => r.id === booking.restaurantId);
    
    res.json({
      success: true,
      data: {
        ...booking,
        restaurant: restaurant
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Restaurant API is running!',
    endpoints: {
      'GET /api/restaurants': 'Get all restaurants',
      'GET /api/restaurants/:id': 'Get restaurant by ID',
      'GET /api/restaurants/cuisine/:cuisine': 'Get restaurants by cuisine',
      'GET /api/restaurants/city/:city': 'Get restaurants by city',
      'GET /api/bookings': 'Get all bookings',
      'GET /api/bookings/:id': 'Get booking by ID',
      'GET /api/bookings/:id/details': 'Get booking with restaurant details',
      'GET /api/bookings/restaurant/:restaurantId': 'Get bookings by restaurant',
      'POST /api/bookings': 'Create new booking'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;