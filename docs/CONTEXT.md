# Quit Porn App - Product Specification

## 🎯 Mission
To help users overcome pornography addiction through an empathetic, structured, and AI-powered mobile application.

## 📱 App Structure

### Navigation
The app uses bottom tab navigation with four main sections:
- **Home** - Streak tracker, emergency support, and daily check-ins
- **Journal** - Mood and trigger tracking
- **Progress** - Data visualization and insights
- **Rewards** - Achievement system

### Home Screen Components
- Current streak counter
- AI chat support button
- Emergency help button
- Daily mood check-in

---

## Core Features

### 1. 🤖 AI Companion

**Purpose:** Provide real-time, empathetic support during urges or emotional challenges.

**Flow:**
1. User taps "Talk to AI Buddy"
2. Chat interface opens with a welcoming message
3. AI responds with empathy and practical suggestions
4. After conversation, AI suggests next actions (journaling, breathing exercises)
5. Option to save conversation for future reference

### 2. 🚨 Emergency Support System

**Purpose:** Deliver immediate tools during moments of strong temptation.

**Flow:**
1. User taps "I'm struggling right now" button
2. Three intervention options appear:
   - 🌬️ **Guided Breathing** - 1-2 minute animation with audio
   - 📓 **Quick Journal** - "What triggered you just now?"
   - 📞 **Contact Support** - (Future feature)
3. After completion, displays affirmation message
4. System logs usage for pattern recognition

### 3. 🔥 Streak Tracking

**Purpose:** Visualize and reinforce progress.

**Flow:**
1. Prominent display of current streak
2. Daily check-in prompt
3. Streak history saved for analytics
4. Upcoming milestone notifications

### 4. 📘 Journal System

**Purpose:** Facilitate self-reflection and pattern identification.

**Flow:**
1. Daily mood and trigger check-in
2. Simple input format:
   - Mood selection (😄/😐/😞)
   - Trigger checklist
   - Optional notes
3. Data visualization in weekly/monthly views
4. AI-generated insights based on patterns

### 5. 📈 Progress Analytics

**Purpose:** Provide data-driven motivation.

**Components:**
- Streak history visualization
- Mood trends over time
- Trigger frequency analysis
- Detailed insights on tap

### 6. 🏆 Achievement System

**Purpose:** Gamify the recovery journey.

**Components:**
- Milestone badges (3-day streak, 10-day streak, etc.)
- Unlock celebrations
- Progress toward next achievement
- Reward content (wallpapers, quotes, etc.)

---

## Technical Considerations

### 🔐 Privacy & Security
- Secure local storage of sensitive data
- Optional data export/deletion
- Future: End-to-end encryption

### ✨ Roadmap
- Community support features
- AI journaling assistant
- Customizable trigger library
- Accountability partner system
- Motivational content feed

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  settings JSONB DEFAULT '{}'
);
```

### Streaks Table
```sql
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  current_days INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Check-ins Table
```sql
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status BOOLEAN NOT NULL, -- true = clean day, false = relapse
  notes TEXT
);
```

### Journal Entries Table
```sql
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  mood TEXT NOT NULL, -- 'happy', 'neutral', 'sad'
  triggers TEXT[], -- Array of trigger tags
  notes TEXT,
  is_emergency BOOLEAN DEFAULT FALSE
);
```

### Triggers Table
```sql
CREATE TABLE triggers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  is_default BOOLEAN DEFAULT FALSE
);
```

### Chat History Table
```sql
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message TEXT NOT NULL,
  is_user BOOLEAN NOT NULL, -- true = user message, false = AI message
  conversation_id UUID NOT NULL
);
```

### Achievements Table
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  criteria JSONB NOT NULL, -- e.g., {"streak_days": 7}
  badge_image_url TEXT
);
```

### User Achievements Table
```sql
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
```

### Emergency Sessions Table
```sql
CREATE TABLE emergency_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tool_used TEXT NOT NULL, -- 'breathing', 'journal', 'support'
  duration_seconds INTEGER,
  success_rating INTEGER -- 1-5 rating of how helpful it was
);
```

## 📁 App Folder Structure

```
quit-porn-app/
├── app/                      # Expo Router app directory
│   ├── (auth)/               # Authentication routes
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/               # Main app tabs
│   │   ├── _layout.tsx       # Tab navigation layout
│   │   ├── index.tsx         # Home tab
│   │   ├── journal.tsx       # Journal tab
│   │   ├── progress.tsx      # Progress tab
│   │   └── rewards.tsx       # Rewards tab
│   ├── chat/                 # AI chat screens
│   │   ├── [id].tsx          # Individual chat conversation
│   │   └── index.tsx         # Chat history
│   ├── emergency/            # Emergency tools
│   │   ├── breathing.tsx
│   │   ├── journal.tsx
│   │   └── index.tsx         # Tool selection
│   ├── settings/             # App settings
│   │   ├── account.tsx
│   │   ├── notifications.tsx
│   │   ├── privacy.tsx
│   │   └── index.tsx
│   └── _layout.tsx           # Root layout
├── assets/                   # Static assets
│   ├── animations/           # Lottie animations
│   ├── images/               # App images
│   └── sounds/               # Audio files
├── components/               # Reusable components
│   ├── ui/                   # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── home/                 # Home screen components
│   │   ├── StreakCounter.tsx
│   │   ├── EmergencyButton.tsx
│   │   └── ...
│   ├── journal/              # Journal components
│   ├── progress/             # Progress visualization components
│   └── rewards/              # Achievement components
├── constants/                # App constants
│   ├── Colors.ts
│   ├── Layout.ts
│   └── ...
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts
│   ├── useStreak.ts
│   └── ...
├── services/                 # API and service integrations
│   ├── supabase.ts           # Supabase client
│   ├── ai.ts                 # AI service
│   └── ...
├── stores/                   # State management
│   ├── authStore.ts
│   ├── streakStore.ts
│   └── ...
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
├── app.json                  # Expo config
├── babel.config.js
├── package.json
└── tsconfig.json
```

This structure provides a solid foundation for building the app while maintaining scalability and organization.
