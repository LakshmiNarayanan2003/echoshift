# EchoShift

A browser-based survival game where you must avoid ghosts that replay your past movements.

![EchoShift](https://img.shields.io/badge/TypeScript-5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## Gameplay

- **Objective**: Survive as long as possible while collecting coins
- **Controls**: Move using WASD or Arrow Keys
- **Mechanic**: Every 10 seconds, a ghost spawns and replays your movements from the previous 10 seconds
- **Challenge**: Ghosts remain active and loop their recorded movements - avoid them at all costs!
- **Scoring**: Collect coins to earn points (+10 per coin)
- **Progression**: More ghosts spawn over time, making survival increasingly difficult

## Features

- **Neon Aesthetic**: Dark cyberpunk-style visuals with glowing effects
- **Smooth Animations**: Fluid player movement and ghost replay
- **Responsive Design**: Automatically adapts to any screen size
- **Progressive Difficulty**: Ghosts accumulate over time, increasing challenge
- **Score Tracking**: Real-time score and survival time display
- **No External Assets**: All graphics generated programmatically with HTML5 Canvas
- **Modular Architecture**: Clean, maintainable TypeScript codebase

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/echoshift.git
   cd echoshift
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
echoshift/
├── src/
│   ├── main.ts          # Entry point and UI logic
│   ├── Game.ts          # Core game loop and state management
│   ├── Player.ts        # Player entity and movement
│   ├── Ghost.ts         # Ghost entity and replay logic
│   ├── Coin.ts          # Coin entity and collection
│   └── types.ts         # TypeScript type definitions
├── index.html           # HTML structure and CSS
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
└── README.md            # This file
```

## Game Mechanics

### Ghost System

- Every 10 seconds, the game records your movement history
- A ghost spawns with the recorded movement pattern
- The ghost replays your exact movements from that 10-second window
- Ghosts loop their movement infinitely
- Touching any ghost ends the game

### Coin System

- Coins spawn randomly every 2 seconds
- Collecting a coin gives +10 points
- Coins pulse with a glowing animation
- Coins disappear when collected

### Difficulty Scaling

- Ghosts accumulate over time (one every 10 seconds)
- Each ghost has a different color for visual distinction
- More ghosts = more movement patterns to avoid
- Survival becomes exponentially harder

## Tech Stack

- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **HTML5 Canvas**: High-performance 2D rendering
- **No external libraries**: Pure vanilla JS/TS implementation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## Future Enhancements

Potential features for future versions:

- Power-ups (speed boost, temporary invincibility)
- Different game modes (time attack, endless)
- Leaderboard system
- Sound effects and music
- Mobile touch controls
- Additional ghost behaviors

## 📧 Contact

Created as an open-source browser game. Feel free to use, modify, and distribute as per the MIT License.

---

**Enjoy playing EchoShift!** 🎮✨
