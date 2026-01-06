# Dockerfile for Node.js/Express backend with Prisma
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install
# Generate Prisma client
RUN npx prisma generate
EXPOSE 3001
CMD ["node", "index.js"]
