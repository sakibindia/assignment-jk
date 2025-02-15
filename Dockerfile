# Dockerfile
# Stage 1: Build and generate docs
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Generate documentation
RUN npm install -g @compodoc/compodoc
RUN compodoc -p tsconfig.json -d documentation

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/documentation ./documentation

# Expose ports (App + Documentation)
EXPOSE 3000 8080

# Start application and serve docs
CMD ["sh", "-c", "npx http-server documentation -p 8080 & npm run start:prod"]