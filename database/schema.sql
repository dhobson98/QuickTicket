-- Database schema for QuickTicket application

-- Create tickets table
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'resolved', 'closed')),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assignee VARCHAR(100),
    reporter VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tags TEXT[] DEFAULT '{}'
);

-- Create index for better query performance
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_priority ON tickets(priority);
CREATE INDEX idx_tickets_assignee ON tickets(assignee);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO tickets (title, description, priority, reporter, assignee, tags) VALUES
('Fix login bug', 'Users cannot login with special characters in password', 'high', 'John Doe', 'Jane Smith', ARRAY['bug', 'authentication']),
('Add dark mode', 'Implement dark mode toggle for better user experience', 'medium', 'Alice Johnson', 'Bob Wilson', ARRAY['feature', 'ui']),
('Database optimization', 'Optimize slow queries in reports section', 'urgent', 'Mike Brown', 'Sarah Davis', ARRAY['performance', 'database']);