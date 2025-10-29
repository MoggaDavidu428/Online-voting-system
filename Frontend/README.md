# Online Voting System - Frontend

## Project Structure

```
Frontend/
├── css/
│   └── style.css          # Main stylesheet with modern styling
├── js/
│   ├── auth.js            # Authentication functions (login/register)
│   ├── vote.js             # Voting functionality
│   └── result.js           # Results display
├── login.html              # Login page
├── register.html           # Registration page
├── vote.html               # Voting page
├── result.html             # Results page
└── index.html              # Home page
```

## Features

### Authentication
- Secure login and registration
- Form validation
- User session management
- Token-based authentication

### Voting System
- Candidate selection interface
- Real-time vote submission
- Secure voting process
- Vote confirmation

### Results
- Live election results
- Visual result bars
- Vote counts and percentages
- Transparent and auditable

## Getting Started

1. Make sure the backend server is running on `http://localhost:3000`
2. Open `index.html` in a web browser
3. Navigate through the pages using the navigation menu

## Pages

- **index.html**: Home page with welcome message and features
- **login.html**: User login interface
- **register.html**: New user registration
- **vote.html**: Candidate selection and voting interface
- **result.html**: Live election results display

## API Endpoints

The frontend expects the following API endpoints:
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/vote` - Submit a vote
- `GET /api/results` - Get election results

## Styling

The application uses a modern gradient design with:
- Responsive layout
- Smooth animations
- Card-based UI
- Professional color scheme

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge)

