// 
import { NextResponse, NextRequest } from "next/server"
import { db } from "../../../../../../lib/db"
import { leads } from "../../../../../../lib/schema"
import { eq } from "drizzle-orm"

export async function PUT(
  request: NextRequest,
  context: { params: { campaignId: string; leadId: string } }
) {
  try {
    const { leadId } = context.params
    const body = await request.json()
    const { name, status, avatarUrl, description, activityLevel } = body

    const updated = await db
      .update(leads)
      .set({ name, status, avatarUrl, description, activityLevel })
      .where(eq(leads.id, Number(leadId)))
      .returning()

    return NextResponse.json({ success: true, lead: updated[0] })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { campaignId: string; leadId: string } }
) {
  try {
    const { leadId } = context.params
    await db.delete(leads).where(eq(leads.id, Number(leadId)))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    })
  }
}
