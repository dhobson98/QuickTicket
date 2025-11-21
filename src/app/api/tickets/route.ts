import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { Ticket } from '@/types'

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        title,
        description,
        status,
        priority,
        assignee,
        reporter,
        created_at,
        updated_at,
        tags
      FROM tickets 
      ORDER BY created_at DESC
    `)

    const tickets: Ticket[] = result.rows.map(row => ({
      id: row.id.toString(),
      title: row.title,
      description: row.description,
      status: row.status,
      priority: row.priority,
      assignee: row.assignee,
      reporter: row.reporter,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      tags: row.tags || []
    }))

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, priority, assignee, reporter, tags } = body

    if (!title || !description || !reporter) {
      return NextResponse.json(
        { error: 'Title, description, and reporter are required' },
        { status: 400 }
      )
    }

    const result = await pool.query(`
      INSERT INTO tickets (title, description, priority, assignee, reporter, tags)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [title, description, priority || 'medium', assignee || null, reporter, tags || []])

    const row = result.rows[0]
    const ticket: Ticket = {
      id: row.id.toString(),
      title: row.title,
      description: row.description,
      status: row.status,
      priority: row.priority,
      assignee: row.assignee,
      reporter: row.reporter,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      tags: row.tags || []
    }

    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    )
  }
}