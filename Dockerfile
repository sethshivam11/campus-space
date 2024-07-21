# Dockerfile for the server (backend)

# Stage 1: Build the backend
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the TypeScript configuration and source code
COPY tsconfig.json ./
COPY server ./server
COPY client ./client

# Compile TypeScript code to JavaScript
RUN npm run build

# Stage 2: Run the backend
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the compiled JavaScript files from the build stage
COPY --from=build /app/dist ./dist

# Install runtime dependencies if needed
COPY package*.json ./
RUN npm install --only=production

# Add environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV ACCESS_TOKEN_SECRET="YOUR_SECRET_TOKEN"
# Add MongoDB URL environment variable
ENV MONGODB_URI="Your mongodb url"

# Expose port 5000 (adjust if needed)
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
