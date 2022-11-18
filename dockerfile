FROM node:alpine
WORKDIR /reactapp
COPY . .
RUN npm run build
EXPOSE 3001
CMD [ "npm", "run", "start:prod" ]