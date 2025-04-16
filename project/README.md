# VR-based Learning Tool

A comprehensive learning platform designed for children with ASD (Autism Spectrum Disorder) and ID (Intellectual Disability), featuring interactive VR experiences and learning activities.

## Project Structure

### Frontend (`/src/frontend/`)

#### Core Components
- `App.tsx` - Main application component and routing setup
- `Layout.tsx` - Main layout wrapper with header and navigation
- `config.ts` - Frontend configuration and API endpoints

#### Authentication
- `Login.tsx` - User login page with email/password and Google OAuth
- `SignUp.tsx` - User registration page
- `UseAuth.ts` - Authentication hook for managing user state

#### User Profile
- `Profile.tsx` - User profile management and avatar selection
- `SelectionPage.tsx` - Disorder type selection (ASD/ID) after registration

#### Learning Pages
- `Asd.tsx` - Main ASD learning hub with activity navigation
- `ID.tsx` - Main ID learning hub with activity navigation
- `ProgressTrackingAsd.tsx` - ASD progress tracking dashboard
- `ProgressTrackingID.tsx` - ID progress tracking dashboard

#### Learning Activities
- `ColoringActivity.tsx` - Interactive coloring exercises
- `CommunicationQuiz.tsx` - Communication skills assessment
- `ObjectQuiz.tsx` - Object recognition and matching
- `RoadCross.tsx` - Road safety simulation
- `VRGroceryLanding.tsx` - Grocery shopping simulation entry
- `VRGroceryShopping.tsx` - Interactive grocery shopping experience
- `SolarSystem.tsx` - Solar system exploration
- `Store3D.tsx` - 3D store environment
- `Store3DAFrame.tsx` - A-Frame based store environment

#### Components
- `LazyImage.tsx` - Optimized image loading component
- `styles/` - CSS styles and animations

### Backend (`/src/backend/`)

#### Authentication
- `Login.ts` - Login route handler
- `SignUp.ts` - Registration route handler
- `Passport.ts` - Google OAuth configuration
- `auth.ts` - Authentication middleware and user verification

#### Models
- `UserSchema.ts` - User data model
- `ProfileSchema.ts` - User profile model
- `ScoreSchema.ts` - Activity scoring model
- `ProgressSchema.ts` - User progress tracking model

#### Routes
- `Profile.ts` - Profile management endpoints
- `scores.ts` - Score tracking and management
- `coloringProgress.ts` - Coloring activity progress tracking

#### Middleware
- `authenticateUser.ts` - JWT authentication middleware
- `trackUserSession.ts` - User session tracking

#### Server
- `server.ts` - Express server setup and configuration
- `config/` - Server configuration files

### Utils (`/src/utils/`)
- `fetchProfile.ts` - Profile data fetching utility
- `UseAuth.ts` - Authentication state management
- `api.ts` - API request utilities

## Key Features

### Authentication System
- Email/Password login
- Google OAuth integration
- JWT token-based authentication
- Session persistence
- Protected routes

### User Management
- Profile creation and editing
- Avatar selection
- Disorder type selection (ASD/ID)
- Progress tracking
- Activity completion status

### Learning Activities
1. ASD Activities
   - Coloring exercises
   - Communication quizzes
   - Object recognition
   - Road safety simulation
   - Grocery shopping simulation

2. ID Activities
   - Basic learning modules
   - Interactive exercises
   - Progress tracking
   - Skill assessment

### Progress Tracking
- Activity completion status
- Score tracking
- Time spent tracking
- Achievement tracking
- Progress visualization

### VR Integration
- 3D store environment
- Interactive shopping experience
- Solar system exploration
- Road crossing simulation

## Technical Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Axios for API requests
- CSS-in-JS for styling
- A-Frame for VR components

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Passport.js for OAuth
- Mongoose for data modeling

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

## Environment Variables

### Frontend
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID

### Backend
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `PORT` - Server port number

## Security Features
- JWT token validation
- Password hashing
- Protected routes
- CORS configuration
- Input sanitization
- Rate limiting

## Error Handling
- Frontend validation
- Backend validation
- Error messages
- Fallback states
- Recovery mechanisms

## Future Enhancements
1. Additional learning activities
2. Advanced analytics dashboard
3. Parent/Educator portal
4. Multi-language support
5. Offline capabilities
6. Enhanced VR experiences
7. Custom activity creation
8. Progress reports generation

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Communication Skills Quiz Feature

### Overview
The Communication Skills Quiz is an interactive learning module designed to help children improve their language and communication skills through engaging visual and text-based questions.

### File Structure

```
src/
├── frontend/
│   ├── CommunicationQuiz.tsx    # Main quiz component
│   └── Layout.tsx               # Layout wrapper with navigation
├── styles/
│   └── CommunicationQuizStyles.css  # Quiz-specific styles
├── utils/
│   ├── submitScore.ts           # Score submission utility
│   └── UseAuth.ts              # Authentication hook
└── public/
    └── quizData.json           # Quiz questions and answers
```

### Key Components

#### 1. CommunicationQuiz.tsx
- **Purpose**: Main quiz interface and logic
- **Features**:
  - Interactive question-answer interface
  - Progress tracking with animated progress bar
  - Image-based questions with visual aids
  - Score calculation and submission
  - Quiz completion handling
  - Restart functionality

#### 2. CommunicationQuizStyles.css
- **Styling Features**:
  - Glassmorphism design with backdrop filters
  - Responsive layout for all screen sizes
  - Animated progress bar
  - Custom button styles with hover effects
  - Image display optimization

### Quiz Data Structure (quizData.json)
```json
{
  "communicationQuiz": [
    {
      "question": "Example question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Correct option",
      "imageUrl": "URL to question image"
    }
  ]
}
```

### Features
1. **Progress Tracking**
   - Real-time progress bar
   - Score calculation
   - Integration with user profile

2. **Visual Learning**
   - Image-based questions
   - High-quality visual aids
   - Responsive image display

3. **Interactive UI**
   - Animated transitions
   - Clear feedback on answers
   - User-friendly interface

4. **Score Management**
   - Automatic score submission
   - Score history tracking
   - Progress visualization

### Technical Implementation

#### State Management
```typescript
const [currentQuestion, setCurrentQuestion] = useState<number>(0);
const [score, setScore] = useState<number>(0);
const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
```

#### Score Submission
```typescript
if (email) {
  submitScore("communication-quiz", score, email);
}
```

#### Progress Calculation
```typescript
<ProgressBar
  animated
  now={((currentQuestion + 1) / questions.length) * 100}
  className="progress-bar-custom"
/>
```

### Integration Points

1. **Authentication**
   - Uses `useAuth` hook for user verification
   - Secure score submission

2. **Progress Tracking**
   - Integrates with `ProgressTrackingAsd` and `ProgressTrackingID`
   - Stores scores in backend database

3. **Navigation**
   - Accessible from both ASD and ID main pages
   - Protected route requiring authentication

### Styling Details

1. **Quiz Container**
```css
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
}
```

2. **Question Card**
```css
.question-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  padding: 20px;
  border-radius: 12px;
}
```

### Usage

1. **Accessing the Quiz**
   - Navigate to either ASD or ID section
   - Click on "COMMUNICATION SKILLS" card
   - Quiz loads automatically

2. **Taking the Quiz**
   - Read question and view associated image
   - Select answer from multiple choices
   - Progress bar shows completion status
   - Final score displayed upon completion

3. **Reviewing Progress**
   - Visit Progress Tracking page
   - View communication quiz scores
   - Track improvement over time

### Maximum Score
- Total Questions: 5
- Points per Question: 1
- Maximum Possible Score: 5

### Error Handling
- Graceful handling of image loading failures
- Network error management
- Score submission retry logic

### Future Enhancements
1. Additional question types
2. Audio pronunciation support
3. Difficulty levels
4. Real-time feedback
5. Detailed answer explanations
