#use a node base image
FROM node:12.18.1

# set maintainer
LABEL maintainer "demo@2kr2m"
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
# set a health check
HEALTHCHECK --interval=5s \
    --timeout=5s \
    CMD curl -f http://127.0.0.1:3000 || exit 1

# tell docker what port to expose
EXPOSE 3000
CMD ["npm", "start"]

# Filename: Dockerfile 
# FROM node:10-alpine
# WORKDIR C:\Users\Hamza\Desktop\api
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]

# FROM node:12.18.1
# ENV NODE_ENV=production

# WORKDIR /api

# COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install --production

# COPY . .

# CMD [ "node", "server.js" ]
