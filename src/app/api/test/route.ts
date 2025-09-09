import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { campaigns } from '../../../lib/schema'

export async function GET() {
  try {
    const allCampaigns = await db.select().from(campaigns).limit(5)
    return NextResponse.json({ success: true, campaigns: allCampaigns })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message })
  }
}
