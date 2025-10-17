#!/bin/bash

cp -r public .next/standalone
cp -r .next/static .next/standalone/.next
cp run.sh .next/standalone

cd .next/standalone
ls -la
# -y makes sure the symlinks are preserved (pnpm creates symlinks for packages)
zip -r -y ../../lambda-deploy.zip .
