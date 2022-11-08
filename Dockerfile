FROM node

# change to production to improve performance
ENV NODE_ENV=development

WORKDIR /app
COPY . /app

# add --production to improve performance
RUN npm install

ENTRYPOINT "node index.js"
