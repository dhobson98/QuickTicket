'use client'

import { Ticket } from '@/types'

interface TicketListProps {
  tickets: Ticket[]
  onTicketClick: (ticket: Ticket) => void
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
}

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800'
}

export default function TicketList({ tickets, onTicketClick }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No tickets found. Create your first ticket to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          onClick={() => onTicketClick(ticket)}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
              {ticket.title}
            </h3>
            <div className="flex space-x-2 ml-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
                {ticket.priority}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                {ticket.status}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {ticket.description}
          </p>
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex space-x-4">
              <span>Reporter: {ticket.reporter}</span>
              {ticket.assignee && <span>Assignee: {ticket.assignee}</span>}
            </div>
            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
          
          {ticket.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {ticket.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}