FROM node:alpine
WORKDIR /reactapp
COPY package.json ./
COPY ./ ./
RUN npm i
CMD ["yarn", "start"]