# Development stage
FROM node:lts-alpine as development

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory and set permissions
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app

# Switch to node user early
USER node

# Copy package files with proper ownership
COPY --chown=node:node package*.json ./

# Install all dependencies (dev + prod) for development
RUN npm ci --include=dev

# Copy source code (this layer changes most frequently)
COPY --chown=node:node . .

# Expose the port
EXPOSE 3000

# Use dumb-init for proper signal handling and faster shutdowns
ENTRYPOINT ["dumb-init", "--"]

# Start the development server with hot reload
CMD ["npm", "run", "dev"]