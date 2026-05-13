const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DIST = path.join(__dirname, 'dist/public/browser');

app.use(express.static(DIST));

// All routes fall back to index.html for Angular routing
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`HMS public client running on port ${PORT}`);
});
