# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Expose the Next.js port & Prisma Studio port
EXPOSE 3000 5555

# Start the application
CMD ["npm", "run", "dev"]