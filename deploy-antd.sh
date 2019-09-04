#!/usr/bin/env bash
cd vue-speedy
yarn version
cd ..
git add . && git commit -m 'coding'
git checkout master && git merge develop && git checkout develop
git push --all && git push --tag
cd vue-speedy
npm publish --registry http://npm.kanasinfo.cn
