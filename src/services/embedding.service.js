const axios = require('axios');

const JINA_ENDPOINT = 'https://api.jina.ai/v1/embeddings';

exports.embedText = async (text) => {
  const response = await axios.post(
    JINA_ENDPOINT,
    {
      model: 'jina-embeddings-v2-base-en',
      input: text
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.JINA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.data[0].embedding;
};
