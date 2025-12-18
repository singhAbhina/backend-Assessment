const db = require('../config/postgres');

exports.saveInteraction = async ({
  sessionId,
  userQuery,
  llmResponse,
  responseTime
}) => {
  await db.query(
    `INSERT INTO interactions
     (session_id, user_query, llm_response, response_time_ms)
     VALUES ($1, $2, $3, $4)`,
    [sessionId, userQuery, llmResponse, responseTime]
  );
};
