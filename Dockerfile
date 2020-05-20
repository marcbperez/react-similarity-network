FROM node:lts-alpine
ADD . /workspace
WORKDIR /workspace
CMD npm install && (npm start &) && npm run watch
