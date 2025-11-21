import { Ticket } from '@/types'

const API_BASE = '/api'

export async function fetchTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_BASE}/tickets`)
  if (!response.ok) {
    throw new Error('Failed to fetch tickets')
  }
  return response.json()
}

export async function fetchTicket(id: string): Promise<Ticket> {
  const response = await fetch(`${API_BASE}/tickets/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch ticket')
  }
  return response.json()
}

export async function createTicket(
  ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Ticket> {
  const response = await fetch(`${API_BASE}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create ticket')
  }
  
  return response.json()
}

export async function updateTicket(
  id: string,
  updates: Partial<Ticket>
): Promise<Ticket> {
  const response = await fetch(`${API_BASE}/tickets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })
  
  if (!response.ok) {
    throw new Error('Failed to update ticket')
  }
  
  return response.json()
}

export async function deleteTicket(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/tickets/${id}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    throw new Error('Failed to delete ticket')
  }
}