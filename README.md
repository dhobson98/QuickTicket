# QuickTicket

An internal web application for team ticket tracking and management. Simple, fast, and focused on getting work done without unnecessary complexity.

## Features

- **Create Tickets**: Simple form to create new tickets with title, description, priority, and assignee
- **View Tickets**: Clean list view of all tickets with status and priority indicators
- **Ticket Details**: Detailed view of individual tickets with full information
- **Team Collaboration**: Assign tickets to team members and track progress
- **Priority Management**: Set priorities (Low, Medium, High, Urgent) for better organization
- **Tagging System**: Add tags to tickets for better categorization
- **Status Tracking**: Track ticket status (Open, In Progress, Resolved, Closed)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with connection pooling
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React components with clean, responsive design
- **API**: RESTful API routes with CRUD operations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- PostgreSQL server (local or remote)

### Installation

1. Clone the repository or open in VS Code
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database:
   - Create a database named `quickticket`
   - Run the SQL schema from `database/schema.sql`
   - Configure your database connection in `.env.local`

4. Configure environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your database credentials
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

> **Note**: See `DATABASE_SETUP.md` for detailed database setup instructions.

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
QuickTicket/
├── .github/
│   └── copilot-instructions.md
├── .vscode/
│   └── tasks.json
├── database/
│   └── schema.sql
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── tickets/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── TicketForm.tsx
│   │   └── TicketList.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── db.ts
│   └── types/
│       └── index.ts
├── .env.local
├── DATABASE_SETUP.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Usage

1. **Creating a New Ticket**:
   - Click "Create New Ticket" button
   - Fill in the form with title, description, priority, assignee, reporter, and tags
   - Click "Create Ticket" to save

2. **Viewing Tickets**:
   - All tickets are displayed on the main page
   - Click on any ticket to view its details

3. **Managing Tickets**:
   - View ticket status, priority, and assignment information
   - Track creation and update timestamps
   - Use tags for better organization

## Contributing

This is an internal tool. Please follow the existing code style and patterns when making changes.

## License

Internal use only.