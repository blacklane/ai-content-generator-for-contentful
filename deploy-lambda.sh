cp "env.testing" .env
cat .env

pnpm install

# the actual build
pnpm build 

# prepare and upload the zip file
aws --version

aws lambda update-function-code --function-name "blacklane_ai_generator" --zip-file fileb://lambda-deploy.zip --publish
