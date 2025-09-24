# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Faça a Lista** is a React Native mobile application built with Expo SDK 54, React Native 0.81, and React 19.1. The project uses Expo Router for file-based routing and follows Clean Architecture principles with MVVM pattern.

## Technology Stack

- **Package Manager**: Bun 1.2.22
- **Framework**: Expo SDK 54 (~54.0.9) with React Native 0.81.4
- **React Version**: 19.1.0 (critical - do not downgrade)
- **TypeScript**: 5.9.2
- **Routing**: Expo Router ~6.0.7 (file-based routing)
- **Firebase**: Multiple Firebase services integrated (@react-native-firebase/*)
- **Monitoring**: Sentry for error tracking
- **Code Quality**: ESLint, Prettier, Husky for pre-commit hooks

## Essential Commands

### Development
```bash
# Start development server
bun start

# Run on Android
bun android

# Run on web
bun web

# Run on iOS
bun ios
```

### Building
```bash
# Prebuild native folders (clean)
bun prebuild

# Build Android release
bun compile

# Build web
bun run build:web
```

### Code Quality
```bash
# Lint code
bun lint

# Format is automatic via lint-staged on commit
```

### Package Management
```bash
# Add dependency (uses expo install)
bun add [package]

# Remove dependency (uses expo remove)
bun rm [package]
```

## Architecture

This project follows **Clean Architecture** with **MVVM** pattern and **Dependency Inversion** principle. The architecture is organized in layers:

### Layer Structure

```
src/
├── core/           # Contracts and interfaces (HttpClient, StorageClient, etc.)
├── data/           # Data layer implementation (repositories, DTOs, mappers)
├── domain/         # Business logic (entities, use cases, repository interfaces)
├── infra/          # External tools adapters (HTTP, storage, analytics)
├── main/           # Entry point, factories, dependency injection
└── presentation/   # UI layer (components, screens, navigation, themes)
```

### Key Architectural Principles

1. **Business logic isolation**: Domain layer has NO external dependencies
2. **MVVM in Presentation**: Each screen has a View + ViewModel pattern
3. **Dependency Inversion**: Never import libraries directly in business logic - use adapters in `infra/` that implement interfaces from `core/contracts/`

### Screen Structure Pattern

Each screen follows this structure:
```
src/presentation/screens/FeatureName/
├── index.ts                    # Export
├── FeatureNameView.tsx         # UI only (presentational)
└── useFeatureNameViewModel.ts  # State and logic
```

### Adding New Dependencies

**CRITICAL**: Never use external libraries directly in domain/business logic!

1. Define contract interface in `src/core/contracts/`
2. Create adapter in `src/infra/` that implements the interface
3. Inject the interface (not implementation) into use cases/repositories

## TypeScript Configuration

### Path Aliases (configured in tsconfig.json)

```typescript
@/*           -> ./src/*
@app/*        -> ./src/app/*
@components/* -> ./src/presentation/components/*
@hooks/*      -> ./src/presentation/hooks/*
@screens/*    -> ./src/presentation/screens/*
@themes/*     -> ./src/presentation/themes/*
@utils/*      -> ./src/core/utils/*
@core/*       -> ./src/core/*
@data/*       -> ./src/data/*
@domain/*     -> ./src/domain/*
@presentation/* -> ./src/presentation/*
```

### TypeScript Strict Mode

This project uses **strict TypeScript** with additional flags:
- `noUnusedLocals`, `noUnusedParameters`
- `noImplicitAny`, `noImplicitThis`, `noImplicitReturns`
- `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`

## Expo Router (File-based Routing)

Routes are defined by file structure in `src/app/`:

```
src/app/
├── (access)/          # Auth group
│   ├── login.tsx
│   ├── register.tsx
│   └── recover.tsx
├── (tabs)/            # Tab navigation group
│   ├── home.tsx
│   ├── list/
│   │   ├── create.tsx
│   │   └── [listId].tsx
│   └── _layout.tsx
├── _layout.tsx        # Root layout
├── index.tsx          # Home/entry point
└── +not-found.tsx     # 404 page
```

- **Typed routes enabled**: `experiments.typedRoutes: true` in app.config.ts
- Generated types in `.expo/types/router.d.ts`

## Firebase Integration

The app integrates multiple Firebase services:
- Authentication
- Analytics
- Crashlytics
- Messaging (Push notifications)
- App Check
- App Distribution
- Remote Config

**Note**: `google-services.json` is gitignored - developers need their own Firebase config.

## Important Notes

### React 19 Compatibility
- This project uses React 19.1.0 which is officially supported by Expo SDK 54
- Do NOT install `@types/react-native` - React Native 0.81 provides its own types
- Avoid `verbatimModuleSyntax: true` in tsconfig - it causes JSX conflicts

### Asset Paths
- Images: `src/presentation/assets/images/` (note: some configs use `src/ui/assets/images/`)
- Fonts: `src/presentation/assets/fonts/Inter/`

### Pre-commit Hooks
- Prettier runs automatically via lint-staged on all staged files
- Configured with Husky

## Testing Strategy

1. **Unit Tests** (ViewModels, UseCases, Mappers):
   - Mock dependencies using interfaces
   - Test files alongside implementation (`.test.ts`)

2. **Component Tests** (Views):
   - Use `@testing-library/react-native`
   - Mock ViewModels to test UI rendering
   - Test files alongside components (`.test.tsx`)

## Development Workflow

### Creating a New Screen

1. Create folder in `src/presentation/screens/ScreenName/`
2. Define domain entities in `src/domain/entities/`
3. Create use case in `src/domain/usecases/`
4. Implement repository in `src/data/repositories/`
5. Create ViewModel hook `useScreenNameViewModel.ts`
6. Create View component `ScreenNameView.tsx`
7. Add route file in `src/app/` following Expo Router conventions

### Creating Reusable Components

- Location: `src/presentation/components/`
- Should be "dumb" (presentational only)
- Receive all data via props
- Use global theme from `src/presentation/themes/`

## Additional Documentation

Detailed architecture guide available in Portuguese at: `src/docs/arquitetura.md`
