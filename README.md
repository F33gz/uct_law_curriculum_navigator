# UCT Law Curriculum Navigator

A React-based curriculum navigation application for UCT Law students to track their academic progress.

## Features

- Horizontal scroll curriculum layout
- Semester-based course organization
- Dark mode support
- Responsive design
- Academic progress tracking

## Deployment

### Netlify Deployment

This application is configured for easy deployment on Netlify.

#### Option 1: Automatic Deployment (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`
4. Your app will be deployed automatically on every commit

#### Option 2: Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify:
   ```bash
   # Using Netlify CLI
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. Or drag and drop the `dist` folder to Netlify's web interface

### Build Configuration

The application uses Vite for building and includes:
- Optimized bundle splitting
- Asset optimization
- Source map generation (disabled in production)
- Terser minification with console removal

### Environment Variables

If you need environment variables for production, create them in Netlify's dashboard:
- Go to Site Settings → Environment Variables
- Add your variables (e.g., `VITE_API_URL`)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Framer Motion (animations)

## Browser Support

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88