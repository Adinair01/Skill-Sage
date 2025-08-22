# AI Career & Skill Development Advisor

## Overview

This is a modern, responsive AI-powered Career & Skill Development Advisor web application built with React and Express. The application provides personalized career recommendations, skill development paths, and progress tracking through interactive assessments and AI-driven analysis. Users can complete comprehensive skills assessments, receive tailored career path suggestions, course recommendations, and internship opportunities based on their profile and interests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript and leverages a modern component architecture:
- **Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: React hooks (useState, useEffect) with custom hooks for assessment logic
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

The application uses a multi-step assessment form pattern with progress tracking, implementing custom hooks like `useAssessment` for managing complex form state across multiple steps.

### Backend Architecture
The backend follows a RESTful API design with Express.js:
- **Framework**: Express.js with TypeScript
- **Architecture Pattern**: Modular route-based organization with separation of concerns
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Middleware**: CORS, JSON parsing, and request logging middleware
- **Error Handling**: Centralized error handling with proper HTTP status codes

The server uses a storage abstraction pattern (`IStorage` interface) allowing for easy database switching in the future.

### Data Storage Solutions
- **Development Storage**: In-memory storage using Maps for rapid prototyping
- **Database Schema**: Designed for PostgreSQL with Drizzle ORM
- **Schema Design**: Four main entities - users, assessments, recommendations, and user progress
- **Data Validation**: Zod schemas for runtime type checking and validation

The database schema supports complex data types (JSONB) for flexible storage of skills, interests, and recommendation data.

### Authentication and Authorization
Currently implements a basic user system with username/password authentication (not fully implemented in the current codebase). The architecture is prepared for session-based authentication with PostgreSQL session storage.

### Component Design System
- **UI Components**: shadcn/ui provides a comprehensive set of accessible components
- **Design Tokens**: CSS custom properties for consistent theming
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: Built-in accessibility features from Radix UI primitives

## External Dependencies

### Database and ORM
- **Drizzle ORM**: Type-safe database toolkit with schema generation
- **PostgreSQL**: Primary database (configured via `@neondatabase/serverless`)
- **Connection**: Environment-based database URL configuration

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Build tool with hot module replacement and optimized bundling
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for production builds

### Data Management
- **TanStack Query**: Server state management with caching and synchronization
- **Zod**: Schema validation for runtime type checking
- **React Hook Form**: Form state management with validation

### Mock Data Sources
The application includes comprehensive mock data for:
- Career paths with match scoring algorithms
- Course recommendations with ratings and metadata
- Internship opportunities with company information
- Skills gap analysis and improvement suggestions

### Replit Integration
- **Replit-specific plugins**: Development environment integration
- **Runtime error overlay**: Enhanced debugging experience
- **Cartographer**: Development tooling for Replit environment