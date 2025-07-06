#!/bin/bash
cd /home/kavia/workspace/code-generation/redglow-blog-107904-2d98a4cc/blog_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

