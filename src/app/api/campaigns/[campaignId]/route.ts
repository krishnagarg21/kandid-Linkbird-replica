import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { campaigns, leads } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'


interface Params {
  params: { campaignId: string }
}

export async function PUT(request: Request, context: Params) {
  const params = await context.params
  const campaignId = Number(params.campaignId)

  try {
    const body = await request.json()
    const { name, status, startDate } = body

    const updated = await db
      .update(campaigns)
      .set({
        name,
        status,
        startDate: new Date(startDate),
      })
      .where(eq(campaigns.id, campaignId))
      .returning()

    return NextResponse.json({ success: true, campaign: updated[0] })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message })
  }
}

export async function DELETE(request: Request, context: Params) {
  const params = await context.params
  const campaignId = Number(params.campaignId)

  try {
    await db.delete(campaigns).where(eq(campaigns.id, campaignId))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message })
  }
}


export async function GET(request: Request, context: Params) {
  const params = await context.params
  const campaignId = Number(params.campaignId)

  try {
    const campaignLeads = await db
      .select()
      .from(leads)
      .where(eq(leads.campaignId, campaignId))

    return NextResponse.json(campaignLeads)
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message })
  }
}


export async function POST(request: Request, context: Params) {
  const params = await context.params
  const campaignId = Number(params.campaignId)

  try {
    const body = await request.json()
    const { name, status, avatarUrl, description, activityLevel } = body

    const newLead = await db
      .insert(leads)
      .values({
        campaignId,
        name,
        status,
        avatarUrl,
        description,
        activityLevel,
      })
      .returning()

    return NextResponse.json(newLead[0])
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message })
  }
}
