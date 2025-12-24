# Resume Builder

A modern, AI-powered resume builder application that allows users to create, customize, and manage professional resumes with ease.

## 🌟 Features

- **AI-Powered Resume Generation**: Automatically generate professional summaries and extract resume data from PDF uploads
- **Multiple Resume Templates**: Choose from 4 professionally designed templates:
  - Classic Template
  - Modern Template
  - Minimal Template
  - Minimal Image Template
- **Real-time Preview**: See changes instantly as you build your resume
- **Customizable Themes**: Pick accent colors to personalize your resume
- **Resume Management**: Create, edit, delete, and organize multiple resumes
- **PDF Upload & Parsing**: Upload existing PDFs to auto-fill resume information
- **Public Resume Sharing**: Share your resume publicly with a shareable link
- **Download & Print**: Export your resume as PDF or print directly
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🏗️ Project Structure

```
ResumeBuilder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── configs/       # API configuration
│   │   ├── assets/        # Static assets and templates
│   │   └── app/           # Redux store setup
│   └── package.json
└── server/                 # Node.js Express backend
    ├── configs/           # Database, AI, and image upload configs
    ├── controllers/       # Business logic
    ├── models/           # MongoDB schemas
    ├── routes/           # API routes
    ├── middlewares/      # Authentication middleware
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Gemini API Key (for AI features)
- ImageKit Account (for image hosting)

### Installation

#### Backend Setup

```bash
cd server
npm install
```

Create a .env file in the server directory:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
GEMINI_API_KEY=your_gemini_api_key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.0-flash-exp
```

Start the server:

```bash
npm run server  # with nodemon for development
# or
npm run start   # production
```

#### Frontend Setup

```bash
cd client
npm install
```

Create a .env file in the client directory:

```env
VITE_BASE_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📝 Key Technologies

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React PDF to Text** - PDF parsing

### Backend
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **ImageKit** - Image hosting
- **OpenAI/Gemini API** - AI features
- **Multer** - File uploads
- **CORS** - Cross-origin requests

## 📚 API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /` - Get user profile
- `PUT /` - Update user profile

### Resume Routes (`/api/resumes`)
- `POST /create` - Create new resume
- `GET /get/:id` - Get resume by ID
- `PUT /update` - Update resume
- `DELETE /:id` - Delete resume
- `GET /all` - Get all user resumes
- `GET /public/:id` - Get public resume

### AI Routes (`/api/ai`)
- `POST /generate-summary` - Generate professional summary
- `POST /upload-resume` - Parse and extract resume data from PDF

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Users must login to:
- Create and manage resumes
- Access the resume builder
- Download/share resumes

## 📦 Resume Data Structure

```javascript
{
  _id: String,
  userId: ObjectId,
  title: String,
  public: Boolean,
  template: String, // 'classic', 'modern', 'minimal', 'minimal-image'
  accent_color: String,
  personal_info: {
    image: String,
    full_name: String,
    profession: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    website: String
  },
  professional_summary: String,
  experience: Array,
  education: Array,
  project: Array,
  skills: Array,
  timestamps: true
}
```

## 🎨 Resume Templates

Each template provides a unique professional design:

- **Classic**: Traditional, formal layout with colored headers
- **Modern**: Contemporary design with accent color highlights
- **Minimal**: Clean, minimalist approach with focus on content
- **Minimal Image**: Includes profile image sidebar with skills

All templates support:
- Dynamic accent color customization
- Responsive design
- Professional typography
- All resume sections

## 🔄 Workflow

1. **Register/Login** - Create or access your account
2. **Create Resume** - Start a new resume from scratch
3. **Fill Information** - Add personal info, experience, education, skills
4. **Choose Template** - Select your preferred resume template
5. **Customize Design** - Pick accent colors and fine-tune layout
6. **Preview** - See real-time preview of your resume
7. **Download/Share** - Export as PDF or get shareable public link
8. **Manage** - Create multiple resumes and switch between them

## 🤖 AI Features

- **AI Summary Generation**: Generates professional summaries based on your experience
- **PDF Parsing**: Uploads and automatically extracts data from existing PDFs
- **Smart Data Extraction**: Intelligently parses resume information using Gemini AI

## 📱 Responsive Design

The application is fully responsive with optimal layouts for:
- Desktop (1920px and above)
- Tablet (768px to 1024px)
- Mobile (up to 767px)

## 🔧 Development

### Running Tests

```bash
# Frontend
cd client
npm run lint

# Backend
cd server
npm test
```

### Building for Production

```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

## 📄 License

ISC

## 👨‍💻 Author

Vivek Shevale

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ to help you land your dream job**
