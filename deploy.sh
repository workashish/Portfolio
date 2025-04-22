#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# create a .nojekyll file to bypass GitHub Pages Jekyll processing
touch .nojekyll

# initialize git repository if not already initialized
git init
git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/workashish/Portfolio.git main:gh-pages

cd -
