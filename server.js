// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const code = req.body.code;

  // Save the code to a file
  fs.writeFileSync('user_code.py', code);

  // Define Dockerfile content
  const dockerfileContent = `
  FROM python:3.9-slim
  WORKDIR /app
  COPY . /app
  CMD ["python", "user_code.py"]
  `;

  // Save Dockerfile
  fs.writeFileSync('Dockerfile', dockerfileContent);

  // Build the Docker image
  exec('docker build -t user-code .', (buildError, buildStdout, buildStderr) => {
    if (buildError) {
      console.error('Build Error:', buildStderr);
      return res.status(500).json({ error: 'Error building Docker image' });
    }  

    // Run the Docker container
    exec('docker run --rm user-code', (runError, runStdout, runStderr) => {
      if (runError) {
        console.error('Run Error:', runStderr);
        return res.status(500).json({ error: 'Error running Docker container' });
      }

      // Return the result
      res.json({
        stdout: runStdout,
        stderr: runStderr
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
