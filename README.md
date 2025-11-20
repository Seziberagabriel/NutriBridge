# NutriBridge: A Digital Platform for Combating Malnutrition in Rwanda

## Overview

**NutriBridge** is a comprehensive web-based platform designed to combat malnutrition and undernutrition in Rwanda by providing equitable access to nutrition knowledge, enabling growth and dietary tracking, and connecting communities with local support systems.


1. **Education** - Reliable nutrition knowledge and awareness resources
2. **Monitoring** - Digital tools for tracking growth and dietary diversity
3. **Connection** - Links to local NGOs, health workers, and food suppliers

---

## Features

### 🎓 Nutrition Education Hub
- **Searchable Resource Library**: Access articles, guides, and best practices on nutrition
- **Categorized Content**: Organized by topics (Child Nutrition, Pregnancy, Food Diversity, etc.)
- **Save for Later**: Bookmark articles to read offline
- **Simple Language**: Content tailored for users with basic digital literacy
- **Evidence-Based**: Resources grounded in WHO and UNICEF guidelines

### 📊 Growth & Dietary Tracking
- **BMI Calculator**: Automatic health status assessment with color-coded alerts
- **Child Growth Monitoring**: Track weight, height, and age over time
- **Dietary Diversity Scoring**: Monitor food variety across 8 food groups
- **Progress Charts**: Visual representation of nutrition trends
- **Malnutrition Alerts**: Real-time notifications for at-risk individuals

### 📈 Analytics & Reports
- **Personal Progress Reports**: View nutrition journey and achievements
- **Key Metrics Dashboard**: BMI, dietary diversity score, health status
- **Trend Analysis**: Historical data visualization
- **Export Functionality**: Download reports as CSV or PDF
- **Personalized Recommendations**: Get tailored nutrition advice

### 🤝 Community Support Directory
- **Local Organization Search**: Find NGOs, health centers, and food suppliers
- **Organization Profiles**: Details on services, ratings, and contact information
- **Direct Messaging**: Connect with organizations for support
- **Province-Based Filtering**: Locate resources in your area
- **Save Favorites**: Quick access to frequently used contacts

### 👨‍⚕️ Health Worker & NGO Portal
- **Community Health Dashboard**: Monitor population-level nutrition trends
- **User Management**: Manage household and health worker accounts
- **At-Risk Case Identification**: Automated flagging of urgent cases
- **Report Generation**: Create aggregated community reports
- **Success Story Tracking**: Document positive outcomes and impact
- **Data Analytics**: Community-level statistics and insights

---

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **State Management**: React Hooks & Client Context

### Backend
- **Runtime**: Node.js (via Next.js API Routes)
- **Database**: PostgreSQL (recommended)
- **Authentication**: Email/Phone + Password/OTP
- **Hosting**: Vercel (production)

### Development Tools
- **Language**: TypeScript
- **Package Manager**: npm
- **Version Control**: Git
- **Deployment**: Vercel
- **Environment**: Cross-platform (Windows, macOS, Linux)

---

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Modern web browser (Chrome, Edge, Firefox)

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Seziberagabriel/Nutribridgee.git
   cd Nutribridgee
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Configure the following variables:
   \`\`\`
   NEXT_PUBLIC_APP_NAME=NutriBridge
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

## Usage Guide

### For Household Users

1. **Sign Up**: Create an account with your email or phone number
2. **Complete Profile**: Enter basic information about your household
3. **Explore Education**: Browse nutrition resources and save favorites
4. **Track Growth**: Log child measurements and dietary intake
5. **Monitor Progress**: View charts and receive personalized recommendations
6. **Find Support**: Connect with local organizations for additional help

### For Health Workers/NGOs

1. **Log In**: Access your admin credentials
2. **View Dashboard**: Monitor community health metrics
3. **Manage Users**: Add or modify household accounts
4. **Generate Reports**: Create reports for program evaluation
5. **Track Impact**: Document success stories and community improvements
6. **Respond to Requests**: Address support requests from households

---

## Project Architecture

### Directory Structure
\`\`\`
NutriBridge/
├── app/
│   ├── auth/                 # Authentication pages (login, register)
│   ├── dashboard/            # Main application pages
│   │   ├── page.tsx         # Dashboard home
│   │   ├── education/       # Education hub
│   │   ├── tracking/        # Growth tracking
│   │   ├── diet/            # Dietary tracking
│   │   ├── reports/         # Analytics reports
│   │   ├── community/       # Support directory
│   │   └── admin/           # Health worker portal
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   └── [custom]/            # Feature-specific components
├── public/
│   └── [images]/            # Static assets
├── lib/
│   └── utils.ts             # Utility functions
└── README.md                # This file
\`\`\`

### Data Flow
\`\`\`
User Interface (React Components)
        ↓
State Management (React Hooks)
        ↓
API Routes / Server Actions (Next.js)
        ↓
Database (PostgreSQL)
\`\`\`

### Key Components

- **AuthContext**: Manages user authentication state
- **DashboardLayout**: Main layout wrapper for authenticated pages
- **EducationHub**: Displays and filters nutrition resources
- **TrackingForms**: Handles growth and dietary data entry
- **AnalyticsDashboard**: Visualizes user progress and metrics
- **CommunityDirectory**: Lists and filters organizations
- **AdminPortal**: Health worker management interface

---

## Development Model

NutriBridge follows the **Incremental Development Model** to allow flexibility and community feedback:

### Increment 1 (Current Release) ✅
- Nutrition Education Modules
- Awareness Campaigns & Resources
- User Registration & Authentication

### Increment 2 (Planned)
- BMI Calculator & Health Status Assessment
- Child Growth Monitoring Charts
- Dietary Diversity Tracking

### Increment 3 (Planned)
- NGO & Food Supplier Directory
- Support Request System
- Health Worker Dashboard

### Future Enhancements
- SMS/Email Notification System
- Offline-First Functionality
- DHIS2 Integration
- Mobile Application
- Multi-language Support

---

## Security & Privacy

- **Data Encryption**: All sensitive data encrypted at rest (AES-256) and in transit (TLS)
- **Authentication**: Secure password storage with hashing
- **Role-Based Access**: Controlled permissions for different user types
- **Privacy Compliance**: Adheres to Rwanda's Data Protection Law (No. 058/2021)
- **Audit Logging**: All user activities logged for accountability
- **HTTPS Only**: All communications use secure protocols

---

## Performance Optimization

- **Responsive Design**: Optimized for low-bandwidth environments (2G/3G)
- **Lightweight Frontend**: Minimal CSS/JS for fast loading
- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Image Optimization**: Optimized images for web delivery
- **Caching Strategy**: Client-side and server-side caching

---

## Accessibility

NutriBridge follows **WCAG 2.1 Level AA** accessibility standards:

- ✅ Proper color contrast (minimum 4.5:1 for text)
- ✅ Semantic HTML structure
- ✅ Screen reader compatibility
- ✅ Keyboard navigation support
- ✅ Alternative text for all images
- ✅ Readable fonts and font sizes
- ✅ Clear error messages

---

## Contributing

We welcome contributions from developers, designers, and community members! Here's how you can help:

1. **Fork the repository**: Create your own copy
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**: Follow coding standards
4. **Test thoroughly**: Ensure all features work correctly
5. **Commit changes**: `git commit -m "Add feature: description"`
6. **Push to branch**: `git push origin feature/your-feature`
7. **Open a Pull Request**: Describe your changes and submit for review

### Development Standards
- Use TypeScript for type safety
- Follow Tailwind CSS best practices
- Write clean, readable code
- Include comments for complex logic
- Test features before submission

---

## Deployment

### Deploy to Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Vercel automatically deploys on push to main branch
4. Monitor deployment status in Vercel dashboard

### Deploy to Other Platforms

The application can be deployed to any platform supporting Node.js 18+:
- AWS (EC2, Elastic Beanstalk, Lambda)
- Google Cloud Platform
- Azure
- DigitalOcean
- Self-hosted servers

---

## Troubleshooting

### Application won't start
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
\`\`\`

### Port 3000 already in use
\`\`\`bash
# Run on different port
PORT=3001 npm run dev
\`\`\`

### Build errors
\`\`\`bash
# Clean build
npm run build -- --clean
\`\`\`

---

## Support & Feedback

- **Report Issues**: Open a GitHub issue with detailed description
- **Request Features**: Submit feature requests through GitHub Discussions
- **Contact**: Reach out to the development team for questions

---

## Hypotheses & Expected Impact

If NutriBridge is successfully deployed, we anticipate:

✅ **Increased Awareness**: 70% of users gain improved nutrition knowledge  
✅ **Measurable Reduction**: 30% decrease in undernutrition cases within 12 months  
✅ **Stronger Collaboration**: Enhanced coordination between health workers, NGOs, and communities  
✅ **Data-Driven Decisions**: Real-time insights enabling targeted interventions  

---

## References

- Food and Agriculture Organization (2023). [The state of food security and nutrition in the world 2023](https://doi.org/10.4060/cc3017en)
- UNICEF (2022). [Nutrition profiles: Rwanda](https://data.unicef.org/resources/nutrition-country-profiles)
- WHO (2021). [Malnutrition fact sheet](https://www.who.int/news-room/fact-sheets/detail/malnutrition)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Authors

**Tuyisingize Sezibera Gabriel**  
African Leadership University  
*Dedicated to combating malnutrition and improving lives in Rwanda*

---

## Acknowledgments

- UNICEF & FAO for nutrition research and guidance
- Rwanda Ministry of Health for policy alignment
- Local NGOs and health workers for community insights
- v0.app for rapid application development
- Vercel for reliable deployment infrastructure

---

**Last Updated**: November 2025  
**Version**: 1.0.0 (Increment 1)  
**Status**: Active Development ✨

*Together, we can bridge the nutrition gap and build a healthier Rwanda.*
