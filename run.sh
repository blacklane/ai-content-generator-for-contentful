#!/bin/bash

# Handler file for Lambda function
HOSTNAME=0.0.0.0 NODE_ENV=production PORT=8080 exec node server.js
