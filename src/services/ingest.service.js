const fs = require('fs');
const path = require('path');
const chunkText = require('../utils/chunkText');
const { embedText } = require('./embedding.service');
const qdrant = require('../config/qdrant');

const COLLECTION = process.env.QDRANT_COLLECTION;

exports.ingestNews = async () => {
  const dataPath = path.join(__dirname, '../../data/news.json');
  const articles = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  await qdrant.createCollection(COLLECTION, {
    vectors: { size: 768, distance: 'Cosine' }
  }).catch(() => {});

  for (const article of articles) {
    const chunks = chunkText(article.content);

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await embedText(chunks[i]);

      await qdrant.upsert(COLLECTION, {
        points: [
          {
            id: `${article.id}-${i}`,
            vector: embedding,
            payload: {
              text: chunks[i],
              title: article.title
            }
          }
        ]
      });
    }
  }

  return { message: 'Ingestion completed' };
};
