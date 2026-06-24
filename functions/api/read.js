export async function onRequest(context) {
  try {
    await context.env.DB.prepare(
      "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)"
    ).run();

    const result = await context.env.DB.prepare(
      "SELECT content FROM messages ORDER BY id DESC LIMIT 1"
    ).first();

    return Response.json({
      message: result ? result.content : null,
    });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}