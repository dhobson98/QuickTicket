# Database Setup Guide

This guide will help you set up PostgreSQL for the QuickTicket application.

## Prerequisites

- PostgreSQL server running locally or remotely
- Database administration tool (pgAdmin, psql, or similar)

## Setup Steps

### 1. Create Database

Connect to your PostgreSQL server and create a new database:

```sql
CREATE DATABASE quickticket;
```

### 2. Configure Environment Variables

Copy the `.env.local` file and update the database connection settings:

```bash
# Database Configuration
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=quickticket
```

### 3. Run Database Schema

Execute the SQL commands in `database/schema.sql` to create the required tables:

```bash
# Using psql command line
psql -U your_username -d quickticket -f database/schema.sql

# Or connect to your database and run the SQL commands manually
```

### 4. Install Dependencies

Make sure you have installed the PostgreSQL client:

```bash
npm install pg @types/pg
```

### 5. Start the Application

```bash
npm run dev
```

## Database Schema

The application uses a single `tickets` table with the following structure:

- `id` (SERIAL PRIMARY KEY)
- `title` (VARCHAR(255) NOT NULL)
- `description` (TEXT NOT NULL)
- `status` (VARCHAR(20), enum: 'open', 'in-progress', 'resolved', 'closed')
- `priority` (VARCHAR(10), enum: 'low', 'medium', 'high', 'urgent')
- `assignee` (VARCHAR(100))
- `reporter` (VARCHAR(100) NOT NULL)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `tags` (TEXT[])

## Troubleshooting

### Connection Issues

1. Verify PostgreSQL is running
2. Check connection credentials in `.env.local`
3. Ensure the database exists
4. Check firewall settings if using remote database

### Permission Issues

Make sure your database user has the following permissions:
- CREATE tables
- INSERT, UPDATE, DELETE on tables
- SELECT on all tables

### Sample Data

The schema includes sample tickets. You can remove the INSERT statements if you prefer to start with an empty database.

## API Endpoints

The application provides the following REST API endpoints:

- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets/[id]` - Get a specific ticket
- `PUT /api/tickets/[id]` - Update a ticket
- `DELETE /api/tickets/[id]` - Delete a ticket