# ContractFlow - SaaS Contracts Management Dashboard

A modern, professional React + Tailwind CSS single-page application for managing and analyzing contracts with AI-powered insights.

## 🚀 Live Demo

[View Live Demo](https://your-deployment-url.vercel.app)

## 📋 Features

### ✅ Authentication System
- Mock JWT authentication (username: any, password: `test123`)
- Persistent login state with localStorage
- Protected routes and user session management

### ✅ Dashboard Layout
- Professional sidebar navigation with active states
- Top bar with user profile dropdown and notifications
- Responsive design for desktop and mobile

### ✅ Contracts Management
- **Contracts List**: Comprehensive table with search, filtering, and pagination
- **Search**: Real-time search by contract name or parties
- **Filters**: Status (Active, Expired, Renewal Due) and Risk Level (High, Medium, Low)
- **Pagination**: 10 contracts per page with navigation controls
- **Status Indicators**: Visual icons and badges for contract status and risk levels

### ✅ Contract Detail View
- **Metadata Display**: Contract parties, dates, status, and risk assessment
- **Clauses Analysis**: Key contract clauses with AI confidence scores
- **AI Insights**: Risk analysis with severity indicators and recommendations
- **Evidence Panel**: Supporting document snippets with relevance scores
- **Side Drawer**: Detailed evidence view with expandable content

### ✅ File Upload System
- **Drag & Drop**: Intuitive file upload with visual feedback
- **Multiple Files**: Support for batch uploads
- **Progress Tracking**: Real-time upload progress with status indicators
- **Error Handling**: Retry functionality for failed uploads
- **File Validation**: Support for PDF, DOC, DOCX files

### ✅ State Management
- React Context API for authentication state
- Local state management for UI interactions
- Persistent storage for user sessions

## 🛠 Tech Stack

- **Frontend**: React 18 (functional components + hooks)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui component library
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Next.js 15 (App Router)
- **Deployment**: Vercel

## 🎨 Design System

### Color Palette
- **Primary**: #164e63 (Professional cyan-800)
- **Secondary**: #8b5cf6 (Modern purple-500)
- **Neutrals**: #ffffff, #f1f5f9, #475569
- **Status Colors**: Green (success), Red (error), Yellow (warning)

### Typography
- **Font**: Geist Sans (clean, modern typeface)
- **Hierarchy**: Clear heading levels with proper contrast
- **Responsive**: Scales appropriately across devices

## 📁 Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main app entry point
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Dashboard.jsx       # Main dashboard container
│   ├── Sidebar.jsx         # Navigation sidebar
│   ├── TopBar.jsx          # Header with user menu
│   ├── ContractsList.jsx   # Contracts table with filters
│   ├── ContractDetail.jsx  # Individual contract view
│   ├── UploadModal.jsx     # File upload interface
│   └── LoginForm.jsx       # Authentication form
├── contexts/
│   └── AuthContext.jsx     # Authentication state management
├── public/
│   ├── contracts.json      # Mock contracts data
│   └── contract-details.json # Detailed contract information
└── lib/
    └── utils.ts            # Utility functions
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/contractflow-dashboard.git
   cd contractflow-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Login Credentials
- **Username**: Any username (e.g., "admin", "user", "demo")
- **Password**: `test123` (required for authentication)

## 📊 Mock API Endpoints

The application uses static JSON files to simulate API responses:

### GET /contracts.json
Returns list of contracts with basic information:
\`\`\`json
[
  {
    "id": "c1",
    "name": "MSA 2025",
    "parties": "Microsoft & ABC Corp",
    "expiry": "2025-12-31",
    "status": "Active",
    "risk": "Medium"
  }
]
\`\`\`

### GET /contract-details.json
Returns detailed contract information including clauses, insights, and evidence:
\`\`\`json
{
  "c1": {
    "id": "c1",
    "name": "MSA 2025",
    "clauses": [...],
    "insights": [...],
    "evidence": [...]
  }
}
\`\`\`

## 🎯 Key Features Implemented

### State Management
- **Authentication Context**: Manages user login state and JWT tokens
- **Local Storage**: Persists authentication across browser sessions
- **Component State**: Handles UI interactions and data fetching

### Error Handling
- **Loading States**: Skeleton loaders and spinners during data fetching
- **Error States**: User-friendly error messages with retry options
- **Empty States**: Helpful messages when no data is available

### Responsive Design
- **Mobile-First**: Optimized for mobile devices with progressive enhancement
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Appropriate touch targets and interactions

### Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color combinations

## 🔧 Development Decisions

### Why React Context API?
- **Simplicity**: Sufficient for the app's state management needs
- **No External Dependencies**: Keeps bundle size minimal
- **Built-in**: Native React solution with excellent TypeScript support

### Why Tailwind CSS?
- **Utility-First**: Rapid development with consistent design system
- **Customization**: Easy theming with CSS custom properties
- **Performance**: Purged CSS for optimal bundle size

### Why Next.js?
- **Developer Experience**: Excellent tooling and development server
- **Performance**: Built-in optimizations and code splitting
- **Deployment**: Seamless Vercel integration

### Component Architecture
- **Functional Components**: Modern React patterns with hooks
- **Single Responsibility**: Each component has a clear, focused purpose
- **Reusability**: Shared UI components from shadcn/ui library

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically on push to main branch

### Manual Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

## 🔮 Future Enhancements

- **Real API Integration**: Connect to actual backend services
- **Advanced Filtering**: Date ranges, custom fields, saved filters
- **Bulk Operations**: Multi-select actions for contracts
- **Document Viewer**: In-app PDF/document preview
- **Notifications**: Real-time alerts for contract renewals
- **Analytics Dashboard**: Contract portfolio insights and metrics
- **Role-Based Access**: Different permission levels for users
- **Export Functionality**: PDF reports and data export

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or support, please open an issue on GitHub or contact [your-email@example.com](mailto:your-email@example.com).

---

**Built with ❤️ using React, Tailwind CSS, and Next.js**
