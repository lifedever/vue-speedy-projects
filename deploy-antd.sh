#!/usr/bin/env bash
cd vue-speedy-antd
yarn version
cd ..
git add . && git commit -m 'coding'
git checkout master && git merge develop && git checkout develop
git push --all && git push --tag
cd vue-speedy-antd
npm publish --registry http://npm.kanasinfo.cn
