# Use the official Node.js runtime as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json ./

# Install npm dependencies
# Note: If you have pnpm-lock.yaml, you may want to generate package-lock.json
# or switch to using pnpm in the Dockerfile
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Next.js runs on
EXPOSE 5173

# Set environment variable for Next.js
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Run the development server
CMD ["npm", "run", "dev"]

