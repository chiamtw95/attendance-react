FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN yarn
EXPOSE 3001
CMD ["yarn", "start"]