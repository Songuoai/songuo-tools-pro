#!/bin/bash
npm run build
if [ -d "out" ]; then
  echo "✅ out 目录生成成功"
  ls -la out/
else
  echo "❌ out 目录未生成"
  exit 1
fi
