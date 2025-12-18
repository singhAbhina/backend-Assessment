const redis = require('../config/redis');
const { retrieveContext } = require('./rag.service');
const { generateAnswer } = require('./llm.service');
const { saveInteraction } = require('../repositories/interaction.repository');

exports.handleChat = async (sessionId, query) => {
  const start = Date.now();

  // 1. Get previous context
  const history =
    (await redis.get(sessionId)) || '';

  // 2. Retrieve RAG context
  const ragContext = await retrieveContext(query);

  // 3. Build prompt
  const prompt = `
You are a news assistant.
Answer using ONLY the context.

Context:
${ragContext}

Chat History:
${history}

Question:
${query}
`;

  // 4. Call LLM
  const answer = await generateAnswer(prompt);

  // 5. Save chat memory
  const updatedHistory = history + `\nQ: ${query}\nA: ${answer}`;
  await redis.setEx(
    sessionId,
    Number(process.env.REDIS_TTL_SECONDS),
    updatedHistory
  );

  // 6. Save log
  await saveInteraction({
    sessionId,
    userQuery: query,
    llmResponse: answer,
    responseTime: Date.now() - start
  });

  return { answer };
};
