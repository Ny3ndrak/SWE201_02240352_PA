// server.js - Express backend for sending push notifications via Expo
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Expo } = require('expo-server-sdk');
require('dotenv').config();

const app = express();
const expo = new Expo();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for device tokens (in production, use a database)
const deviceTokens = new Map();

// API Key for basic authentication (in production, use proper auth)
const API_KEY = process.env.API_KEY || 'dev-api-key-12345';

// Middleware to check API key
function requireApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
}

/**
 * Health check endpoint
 */
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    service: 'TaskRemind Backend',
    version: '1.0.0',
    endpoints: [
      'POST /api/register-token - Register device token',
      'POST /api/send-notification - Send notification to device',
      'POST /api/task-created - Handle task creation notification',
      'GET /api/tokens - Get all registered tokens',
    ],
  });
});

/**
 * Register a device token
 * POST /api/register-token
 * Body: { expoPushToken, deviceId, platform }
 */
app.post('/api/register-token', requireApiKey, (req, res) => {
  const { expoPushToken, deviceId, platform } = req.body;

  if (!expoPushToken || !Expo.isExpoPushToken(expoPushToken)) {
    return res.status(400).json({ error: 'Invalid Expo push token' });
  }

  // Store token with device info
  deviceTokens.set(deviceId, {
    token: expoPushToken,
    platform,
    registeredAt: new Date().toISOString(),
  });

  console.log(`✅ Registered device: ${deviceId} (${platform})`);
  console.log(`   Token: ${expoPushToken}`);

  res.json({
    success: true,
    message: 'Device token registered successfully',
    deviceId,
  });
});

/**
 * Send a push notification to a specific device
 * POST /api/send-notification
 * Body: { expoPushToken, title, body, data }
 */
app.post('/api/send-notification', requireApiKey, async (req, res) => {
  const { expoPushToken, title, body, data } = req.body;

  if (!expoPushToken || !Expo.isExpoPushToken(expoPushToken)) {
    return res.status(400).json({ error: 'Invalid Expo push token' });
  }

  // Create the message
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title || 'TaskRemind Notification',
    body: body || 'You have a new notification',
    data: data || {},
    priority: 'high',
    channelId: 'task-reminders',
  };

  try {
    // Send the notification via Expo Push Notification service
    const chunks = expo.chunkPushNotifications([message]);
    const tickets = [];

    for (let chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }

    console.log(`📤 Notification sent: "${title}"`);
    console.log(`   To: ${expoPushToken}`);
    console.log(`   Tickets:`, tickets);

    res.json({
      success: true,
      message: 'Notification sent successfully',
      tickets,
    });
  } catch (error) {
    console.error('❌ Error sending notification:', error);
    res.status(500).json({
      error: 'Failed to send notification',
      details: error.message,
    });
  }
});

/**
 * Handle task creation and schedule reminder notification
 * POST /api/task-created
 * Body: { expoPushToken, taskId, title, dueDate }
 */
app.post('/api/task-created', requireApiKey, async (req, res) => {
  const { expoPushToken, taskId, title, dueDate } = req.body;

  if (!expoPushToken || !Expo.isExpoPushToken(expoPushToken)) {
    return res.status(400).json({ error: 'Invalid Expo push token' });
  }

  console.log(`📝 Task created: ${title} (ID: ${taskId})`);
  console.log(`   Due: ${dueDate}`);

  // In a real app, you would:
  // 1. Store the task info in a database
  // 2. Schedule a notification using a job queue (e.g., Bull, Agenda)
  // 3. Send the notification at the appropriate time

  // For this demo, we'll send an immediate confirmation notification
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: '✅ Task Created',
    body: `"${title}" has been created. You'll be notified before it's due.`,
    data: { taskId, type: 'task-created' },
    channelId: 'task-reminders',
  };

  try {
    const chunks = expo.chunkPushNotifications([message]);
    const tickets = [];

    for (let chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }

    console.log(`✅ Task creation confirmation sent`);

    res.json({
      success: true,
      message: 'Task creation notification sent',
      tickets,
    });
  } catch (error) {
    console.error('❌ Error sending task creation notification:', error);
    res.status(500).json({
      error: 'Failed to send notification',
      details: error.message,
    });
  }
});

/**
 * Get all registered device tokens (for admin/debugging)
 * GET /api/tokens
 */
app.get('/api/tokens', requireApiKey, (req, res) => {
  const tokens = Array.from(deviceTokens.entries()).map(([deviceId, info]) => ({
    deviceId,
    ...info,
  }));

  res.json({
    count: tokens.length,
    tokens,
  });
});

/**
 * Broadcast notification to all registered devices
 * POST /api/broadcast
 * Body: { title, body, data }
 */
app.post('/api/broadcast', requireApiKey, async (req, res) => {
  const { title, body, data } = req.body;

  if (deviceTokens.size === 0) {
    return res.status(400).json({ error: 'No devices registered' });
  }

  const messages = Array.from(deviceTokens.values()).map(device => ({
    to: device.token,
    sound: 'default',
    title: title || 'TaskRemind Broadcast',
    body: body || 'Broadcast notification',
    data: data || {},
    channelId: 'task-reminders',
  }));

  try {
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    for (let chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }

    console.log(`📢 Broadcast sent to ${deviceTokens.size} devices`);

    res.json({
      success: true,
      message: `Broadcast sent to ${deviceTokens.size} devices`,
      tickets,
    });
  } catch (error) {
    console.error('❌ Error broadcasting:', error);
    res.status(500).json({
      error: 'Failed to broadcast notification',
      details: error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 TaskRemind Backend running on port ${PORT}`);
  console.log(`📡 API Key: ${API_KEY}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   GET  / - Health check`);
  console.log(`   POST /api/register-token - Register device`);
  console.log(`   POST /api/send-notification - Send notification`);
  console.log(`   POST /api/task-created - Task creation handler`);
  console.log(`   POST /api/broadcast - Broadcast to all devices`);
  console.log(`   GET  /api/tokens - List registered tokens`);
  console.log(`\n💡 Use X-API-Key header: ${API_KEY}`);
});
