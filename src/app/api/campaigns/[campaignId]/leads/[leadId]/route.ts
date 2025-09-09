import { NextResponse } from 'next/server'
import { db } from '../../../../../../lib/db'
import { leads } from '../../../../../../lib/schema'
import { eq } from 'drizzle-orm'

interface Params {
  params: { campaignid: string; leadid: string }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const leadId = Number(params.leadid)
    const body = await request.json()
    const { name, status, avatarUrl, description, activityLevel } = body

    const updated = await db
      .update(leads)
      .set({ name, status, avatarUrl, description, activityLevel })
      .where(eq(leads.id, leadId))
      .returning()

    return NextResponse.json({ success: true, lead: updated[0] })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const leadId = Number(params.leadid)
    await db.delete(leads).where(eq(leads.id, leadId))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message })
  }
}
