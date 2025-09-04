import postgres from "postgres";

async function test() {
  const sql = postgres(process.env.DATABASE_URL!);
  try {
    const result = await sql`SELECT NOW()`;
    console.log("Connection successful:", result);
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await sql.end();
  }
}

test();
