'use client'

import { useState, useEffect, useRef } from 'react'

interface LeadProfileProps {
  lead: {
    name: string;
    title: string;
    email: string;
    company: string;
    campaign: string;
    profilePic: string;
    interactions: { type: string; message: string; timestamp: string }[];
    status: string;
  }
  onClose: () => void;
}

export default function LeadDetailSideSheet({ lead, onClose }: LeadProfileProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  function handleClickOutside(e: MouseEvent) {
    if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <aside
      ref={sheetRef}
      className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 overflow-y-auto transform transition-transform duration-300"
      style={{ transform: 'translateX(0)' }}
    >
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{lead.name}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close Lead Detail"
        >
          ✕
        </button>
      </header>
        <section className="mb-4 flex items-center gap-4">
            {lead.profilePic ? (
                <img className="w-16 h-16 rounded-full" src={lead.profilePic} alt={lead.name} />
            ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-gray-600">
                {lead.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
            )}
            <div>
                <p className="font-medium">{lead.title}</p>
                <p className="text-sm text-gray-500">{lead.email}</p>
                <p className="text-sm text-gray-500">{lead.company}</p>
                <p className="text-sm text-gray-400 italic">{lead.campaign}</p>
            </div>
        </section>

      <section>
        <h3 className="font-semibold mb-2">Interactions</h3>
        <ul className="space-y-3">
          {lead.interactions.map((interaction, idx) => (
            <li key={idx} className="p-3 bg-gray-50 rounded">
              <div className="text-xs font-semibold">{interaction.type}</div>
              <div className="text-sm">{interaction.message}</div>
              <div className="text-xs text-gray-400">{interaction.timestamp}</div>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-6">
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Contact</button>
        <button className="w-full mt-3 border border-gray-300 py-2 rounded hover:bg-gray-100">Update Status</button>
      </section>
    </aside>
  )
}
