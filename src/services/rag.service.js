const qdrant = require('../config/qdrant');
const { embedText } = require('./embedding.service');

exports.retrieveContext = async (query) => {
  const embedding = await embedText(query);

  const result = await qdrant.search(
    process.env.QDRANT_COLLECTION,
    {
      vector: embedding,
      limit: Number(process.env.TOP_K)
    }
  );

  return result.map(r => r.payload.text).join('\n');
};
