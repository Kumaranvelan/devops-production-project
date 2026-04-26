const express = require('express');
const client = require('prom-client');

const app = express();
app.use(express.json());

// Prometheus metrics setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'App is running' });
});

// Tasks route (in-memory, no MongoDB)
let tasks = [
  { id: 1, title: 'Learn Kubernetes', done: false },
  { id: 2, title: 'Setup Prometheus', done: false },
  { id: 3, title: 'Deploy to EKS', done: true }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: tasks.length + 1, ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

// Metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
