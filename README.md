# LearnFlow - Interactive Learning Platform

A hackathon-ready learning platform that generates adaptive lessons with interactive quizzes using AI.

## Quick Start Guide

### 1. Installation
\`\`\`bash
# Clone or download the project
cd learning-platform

# Install dependencies (if needed)
npm install
\`\`\`

### 2. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

### 3. How to Use
1. Enter any topic in the search bar (e.g., "Machine Learning", "Quantum Physics", "Web Development")
2. The app automatically fetches related questions and generates 5 adaptive lessons
3. Click on any lesson card to take an interactive quiz
4. Track your progress with the stats panel and achievement badges
5. Toggle dark mode with the moon/sun button in the top right

## Features

✨ **Smart Learning**
- Auto-generates 5 adaptive lessons (Fundamentals → Advanced)
- Interactive quizzes with instant feedback
- Real-time mastery level tracking

🎨 **Beautiful Design**
- Glassmorphism effects
- Smooth animations and transitions
- Dark mode support
- Fully responsive design

🏆 **Gamification**
- Achievement badges system
- Global leaderboard
- Streak tracking
- Mastery level visualization

🚀 **Performance**
- No API keys required (uses DuckDuckGo)
- Fast lesson generation
- Smooth animations
- Optimized for mobile and desktop

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom animations
- **API**: DuckDuckGo (free, no auth required)
- **State Management**: React hooks + localStorage

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & animations
│   └── api/
│       └── generate-lessons/ # API route for lesson generation
├── components/
│   ├── search-bar.tsx        # Search input component
│   ├── lesson-grid.tsx       # Lessons grid layout
│   ├── lesson-card.tsx       # Individual lesson card
│   ├── quiz-modal.tsx        # Quiz modal component
│   ├── stats-panel.tsx       # Stats display
│   ├── achievement-badges.tsx # Achievements
│   ├── leaderboard.tsx       # Leaderboard
│   └── particle-background.tsx # Animated particles
├── types/
│   └── lesson.ts             # TypeScript types
└── README.md                 # This file
\`\`\`

## Environment Variables

No environment variables required! The app uses free public APIs.

## Deployment

### Deploy to Vercel (Recommended)
\`\`\`bash
# Push to GitHub first
git push origin main

# Then deploy from Vercel dashboard
# https://vercel.com/new
\`\`\`

### Deploy to Other Platforms
The app is a standard Next.js 16 app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting

## Customization

### Change Colors
Edit the CSS variables in `app/globals.css`:
\`\`\`css
:root {
  --primary: oklch(0.45 0.25 280);    /* Purple */
  --secondary: oklch(0.65 0.2 200);   /* Blue */
  --accent: oklch(0.7 0.22 40);       /* Orange */
}
\`\`\`

### Add More Animations
Add new keyframes in `app/globals.css` and create utility classes.

### Customize Lessons
Edit the lesson generation logic in `app/api/generate-lessons/route.ts`

## Troubleshooting

### App not loading?
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Ensure you're on http://localhost:3000

### Animations not working?
- Verify Tailwind CSS is properly imported
- Check that animation classes are spelled correctly
- Clear Next.js cache: `rm -rf .next`

### Lessons not generating?
- Check network tab in DevTools (F12)
- Verify DuckDuckGo API is accessible
- Try a different search term

## Tips for Hackathon

1. **Impress judges with animations** - All animations are smooth and performant
2. **Show off the UI** - Dark mode, glassmorphism, and gradient effects
3. **Demonstrate features** - Try different topics to show lesson variety
4. **Highlight gamification** - Show stats, achievements, and leaderboard
5. **Mobile responsive** - Test on phone to show responsive design

## License

MIT - Feel free to use for hackathons and projects!

## Support

For issues or questions, check the code comments or create an issue.

Happy learning! 🚀
