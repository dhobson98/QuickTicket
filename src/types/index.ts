export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  reporter: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface TicketComment {
  id: string;
  ticketId: string;
  author: string;
  content: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'tester' | 'manager';
}