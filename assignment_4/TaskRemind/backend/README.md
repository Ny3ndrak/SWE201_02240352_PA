# Backend README

## TaskRemind Backend Server

Express.js backend server for handling push notifications via Expo Push Notification service.

### Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Or with auto-reload (development)
npm run dev
```

Server will run on `http://localhost:3000` by default.

### Configuration

Create `.env` file:
```
PORT=3000
API_KEY=your-secure-api-key
```

### API Documentation

All protected endpoints require the `X-API-Key` header.

#### Endpoints

**GET /** - Health check
```bash
curl http://localhost:3000/
```

**POST /api/register-token** - Register device
```bash
curl -X POST http://localhost:3000/api/register-token \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d '{"expoPushToken":"ExponentPushToken[xxx]","deviceId":"device-1","platform":"android"}'
```

**POST /api/send-notification** - Send notification
```bash
curl -X POST http://localhost:3000/api/send-notification \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d '{"expoPushToken":"ExponentPushToken[xxx]","title":"Test","body":"Hello","data":{}}'
```

**POST /api/task-created** - Task creation handler
```bash
curl -X POST http://localhost:3000/api/task-created \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d '{"expoPushToken":"ExponentPushToken[xxx]","taskId":"123","title":"Task","dueDate":"2026-06-10"}'
```

**POST /api/broadcast** - Broadcast to all
```bash
curl -X POST http://localhost:3000/api/broadcast \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d '{"title":"Announcement","body":"News for everyone","data":{}}'
```

**GET /api/tokens** - List registered tokens
```bash
curl http://localhost:3000/api/tokens \
  -H "X-API-Key: dev-api-key-12345"
```

### Deployment Options

**Local Network**:
- Run on your machine
- Access via local IP (e.g., `http://192.168.1.100:3000`)
- Ensure mobile device on same network

**Cloud Platforms** (Free Tiers):
- Railway (https://railway.app)
- Render (https://render.com)
- Fly.io (https://fly.io)
- Heroku (https://heroku.com)

### Postman Collection

Import `TaskRemind_API.postman_collection.json` into Postman for easy API testing.

### Security Notes

- Default API key is for development only
- In production, use environment variables
- Implement proper authentication (OAuth/JWT)
- Use HTTPS
- Add rate limiting
- Validate all inputs

### Dependencies

- **express**: Web framework
- **expo-server-sdk**: Expo push notification client
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **body-parser**: Request body parsing

### Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env or use different port
PORT=3001 npm start
```

**Network issues:**
- Check firewall settings
- Ensure device and computer on same network
- Use local IP, not localhost

**Expo token errors:**
- Verify token format: `ExponentPushToken[...]`
- Ensure token is fresh (regenerate if old)
- Check Expo service status
