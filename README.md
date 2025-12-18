# 🚀 Scalable RAG API for News Intelligence

A production-ready Retrieval-Augmented Generation (RAG) API designed for intelligent news querying and analysis. This system enables semantic search over news articles and provides contextually relevant answers using LLM technology combined with vector database retrieval.
<img width="1278" height="783" alt="image" src="https://github.com/user-attachments/assets/83c72cfe-d51d-444c-92c1-575ff837237a" />

## 📋 Overview

This API leverages cutting-edge RAG architecture to:
- Ingest and process news articles into searchable vector embeddings
- Enable semantic search over news content using Pinecone vector database
- Generate intelligent, context-aware responses using Large Language Models
- Maintain conversation history and session management
- Cache responses for improved performance using Redis


## ✨ Features

- **News Ingestion**: Process and embed news articles into vector database
- **Semantic Search**: Retrieve relevant news articles based on context and meaning
- **RAG-Powered Chat**: Get intelligent answers grounded in actual news data
- **Session Management**: Track conversation history across sessions
- **Caching Layer**: Redis-based caching for optimized response times
- **MongoDB Storage**: Persistent storage for interaction history
- **Scalable Architecture**: Modular design for easy scaling and maintenance

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js
- **Vector Database**: Pinecone
- **Database**: MongoDB
- **Cache**: Redis
- **LLM Integration**: API-based LLM service
- **Embeddings**: API-based embedding generation

## 📁 Project Structure

```
├── src/
│   ├── app.js                      # Express app configuration
│   ├── server.js                   # Server entry point
│   ├── config/                     # Database and service configurations
│   │   ├── mongodb.js              # MongoDB connection
│   │   ├── pinecone.js             # Pinecone client setup
│   │   └── redis.js                # Redis client setup
│   ├── controllers/                # Request handlers
│   │   ├── chat.controller.js      # Chat endpoint logic
│   │   └── ingest.controller.js    # Ingestion endpoint logic
│   ├── middlewares/                # Express middlewares
│   │   └── error.middleware.js     # Global error handler
│   ├── repositories/               # Data access layer
│   │   └── interaction.repository.js
│   ├── routes/                     # API route definitions
│   │   ├── chat.routes.js          # Chat endpoints
│   │   ├── history.routes.js       # History endpoints
│   │   └── ingest.routes.js        # Ingestion endpoints
│   ├── services/                   # Business logic
│   │   ├── chat.service.js         # Chat orchestration
│   │   ├── embedding.service.js    # Embedding generation
│   │   ├── ingest.service.js       # Document ingestion
│   │   ├── llm.service.js          # LLM API integration
│   │   └── rag.service.js          # RAG pipeline
│   └── utils/                      # Helper utilities
│       └── chunkText.js            # Text chunking logic
├── data/
│   └── news.json                   # Sample news data
└── package.json                    # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Redis (v6 or higher)
- Pinecone API account
- LLM API access (OpenAI, Anthropic, or similar)
- Embedding API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SCALABLE-RAG-API-FOR-NEWS-INTELLIGENCE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/news_rag_db
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/news_rag_db

   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=

   # Pinecone Configuration
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_pinecone_environment
   PINECONE_INDEX=news-index

   # LLM Configuration
   LLM_API_KEY=your_llm_api_key
   LLM_BASE_URL=https://api.openai.com/v1
   LLM_MODEL=gpt-4

   # Embedding Configuration
   EMBEDDING_API_KEY=your_embedding_api_key
   EMBEDDING_BASE_URL=https://api.openai.com/v1
   EMBEDDING_MODEL=text-embedding-3-small
   ```

4. **Set up databases**
   
   **MongoDB:**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or use MongoDB Atlas (cloud)
   # Sign up at https://www.mongodb.com/cloud/atlas
   ```

   **Pinecone:**
   ```bash
   # Sign up at https://www.pinecone.io/
   # Create a new index with:
   # - Dimensions: 1536 (for OpenAI embeddings) or your model's dimension
   # - Metric: cosine
   # - Pods: Starter (1 pod) or scale as needed
   ```

   **Redis:**
   ```bash
   # Using Docker
   docker run -p 6379:6379 redis
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server should now be running at `http://localhost:5000`

## 📡 API Endpoints

### 1. Ingest News Articles

**Endpoint:** `POST /ingest`

**Description:** Process and ingest news articles into the vector database.

**Request Body:**
```json
{
  "articles": [
    {
      "id": "1",
      "title": "Breaking News Title",
      "content": "Full article content...",
      "source": "News Source",
      "publishedAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ingested": 1,
    "failed": 0
  }
}
```

### 2. Chat with RAG

**Endpoint:** `POST /chat`

**Description:** Ask questions about news articles and get AI-powered responses.

**Request Body:**
```json
{
  "sessionId": "user-session-123",
  "query": "What are the latest developments in AI technology?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": "Based on recent news articles, the latest developments in AI technology include...",
    "sources": [
      {
        "title": "Article Title",
        "relevance": 0.95
      }
    ]
  }
}
```

### 3. Get Chat History

**Endpoint:** `GET /history/:sessionId`

**Description:** Retrieve conversation history for a specific session.

**Response:**
```json
{
  "success": true,
  "data": [],
  "message": "History not implemented yet"
}
```

### 4. Clear Chat History

**Endpoint:** `DELETE /history/:sessionId`

**Description:** Clear conversation history for a specific session.

**Response:**
```json
{
  "success": true,
  "message": "History cleared (stub)"
}
```

## 💡 Usage Examples

### Ingesting News Articles

```bash
curl -X POST http://localhost:5000/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "articles": [
      {
        "id": "1",
        "title": "AI Revolution in Healthcare",
        "content": "Artificial intelligence is transforming the healthcare industry...",
        "source": "Tech News",
        "publishedAt": "2025-01-15T10:00:00Z"
      }
    ]
  }'
```

### Querying the RAG System

```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "user-123",
    "query": "How is AI being used in healthcare?"
  }'
```

## 🏗️ Architecture

The system follows a layered architecture:

1. **Routes Layer**: Handles HTTP requests and routing
2. **Controllers Layer**: Validates input and coordinates services
3. **Services Layer**: Implements business logic and orchestration
4. **Repositories Layer**: Manages data persistence
5. **Config Layer**: Database and external service connections

### RAG Pipeline

1. **Ingestion Phase**:
   - News articles are chunked into manageable pieces
   - Each chunk is converted to embeddings
   - Embeddings are stored in Pinecone vector database
   - Metadata is stored in MongoDB

2. **Retrieval Phase**:
   - User query is converted to embedding
   - Semantic search retrieves top-k relevant chunks
   - Results are ranked by relevance score

3. **Generation Phase**:
   - Retrieved context is formatted into prompt
   - LLM generates response based on context
   - Response is cached in Redis for future queries
   - Interaction is logged to MongoDB

## 🔧 Configuration

### Chunking Strategy

Configure text chunking in [src/utils/chunkText.js](src/utils/chunkText.js):
- Chunk size
- Overlap size
- Splitting strategy

### Vector Search

Adjust search parameters in [src/services/rag.service.js](src/services/rag.service.js):
- Top-K results
- Similarity threshold
- Collection name

### Cache Settings

Modify cache behavior in [src/config/redis.js](src/config/redis.js):
- TTL (Time To Live)
- Cache key patterns

### Pinecone Configuration

Adjust vector search settings:
- Index dimensions (must match embedding model)
- Similarity metric (cosine, euclidean, dotproduct)
- Namespace organization
- Pods and replicas for scaling

## 🧪 Testing

```bash
# Run tests (when test suite is added)
npm test

# Run with coverage
npm run test:coverage
```

## 📊 Performance Optimization

- **Caching**: Redis caches frequently asked queries
- **Connection Pooling**: MongoDB connection pooling for efficient DB access
- **Batch Processing**: Bulk ingestion and upserts to Pinecone for large datasets
- **Async Processing**: Non-blocking I/O for scalability
- **Pinecone Namespaces**: Organize vectors by category for faster queries

## 🔒 Security Considerations

- Validate and sanitize all user inputs
- Use environment variables for sensitive data
- Implement rate limiting for API endpoints
- Enable CORS with specific origin restrictions
- Use HTTPS in production

## 📈 Scaling Guidelines

1. **Horizontal Scaling**: Deploy multiple API instances behind a load balancer
2. **Database Scaling**: MongoDB sharding and replica sets for high availability
3. **Cache Clustering**: Redis cluster for distributed caching
4. **Vector DB Scaling**: Pinecone pod-based scaling (scale up/out based on workload)

## 🐛 Troubleshooting

### Common Issues

**Database Connection Errors:**
- Verify database credentials in `.env`
- Ensure MongoDB/Redis services are running
- For MongoDB Atlas, check IP whitelist settings
- For Pinecone, verify API key and environment are correct
- Check network connectivity and firewall rules

**Embedding/LLM API Errors:**
- Verify API keys are correct
- Check API rate limits
- Ensure proper internet connectivity

**Performance Issues:**
- Monitor Redis cache hit rates
- Check database query performance
- Review chunk size and retrieval parameters

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Abhinav Singh

## 🙏 Acknowledgments

- OpenAI for embedding and LLM capabilities
- Pinecone for vector database technology
- MongoDB for flexible document storage
- Express.js community for the robust framework

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Contact: [abhi17may2004@gmail.com]

---

**Built with ❤️ using RAG technology**
