'use client'

import { useState, useEffect } from 'react'
import { Ticket } from '@/types'
import TicketForm from '@/components/TicketForm'
import TicketList from '@/components/TicketList'
import { fetchTickets, createTicket as apiCreateTicket } from '@/lib/api'

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      setLoading(true)
      setError(null)
      const ticketsData = await fetchTickets()
      setTickets(ticketsData)
    } catch (err) {
      setError('Failed to load tickets. Please check your database connection.')
      console.error('Error loading tickets:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTicket = await apiCreateTicket(ticketData)
      setTickets(prev => [newTicket, ...prev])
      setShowForm(false)
    } catch (err) {
      setError('Failed to create ticket. Please try again.')
      console.error('Error creating ticket:', err)
    }
  }

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket)
  }

  if (selectedTicket) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setSelectedTicket(null)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Back to tickets
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4 flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{selectedTicket.title}</h1>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${selectedTicket.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    selectedTicket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    selectedTicket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {selectedTicket.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${selectedTicket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                    selectedTicket.status === 'in-progress' ? 'bg-purple-100 text-purple-800' :
                    selectedTicket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {selectedTicket.status}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">{selectedTicket.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="font-medium text-gray-500">Reporter:</span> {selectedTicket.reporter}
              </div>
              <div>
                <span className="font-medium text-gray-500">Assignee:</span> {selectedTicket.assignee || 'Unassigned'}
              </div>
              <div>
                <span className="font-medium text-gray-500">Created:</span> {new Date(selectedTicket.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="font-medium text-gray-500">Updated:</span> {new Date(selectedTicket.updatedAt).toLocaleString()}
              </div>
            </div>
            
            {selectedTicket.tags.length > 0 && (
              <div className="mb-6">
                <span className="font-medium text-gray-500 block mb-2">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTicket.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Ticket</h1>
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <TicketForm
            onSubmit={createTicket}
            onCancel={() => setShowForm(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            QuickTicket
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Team Ticket Tracking & Management
          </p>
          <p className="text-gray-500 max-w-md mx-auto">
            Simple, fast, and focused on getting work done without unnecessary complexity.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Tickets ({tickets.length})
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Ticket
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button
              onClick={loadTickets}
              className="ml-4 text-sm underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading tickets...</p>
          </div>
        ) : (
          <TicketList tickets={tickets} onTicketClick={handleTicketClick} />
        )}

        {tickets.length === 0 && (
          <div className="text-center py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="font-semibold mb-2">Quick Access</h3>
                <p className="text-sm text-gray-600">Create and manage tickets efficiently</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="font-semibold mb-2">Team Collaboration</h3>
                <p className="text-sm text-gray-600">Work together on ticket resolution</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="font-semibold mb-2">Simple Interface</h3>
                <p className="text-sm text-gray-600">No unnecessary complexity</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}