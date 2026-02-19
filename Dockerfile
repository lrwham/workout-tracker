# Stage 1: Build the React app
FROM node:22-slim AS build

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .

# VITE_API_URL is baked in at build time.
# Override with: docker build --build-arg VITE_API_URL=https://api.example.com .
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Copy built files to nginx's default serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config for SPA routing (react-router needs this)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
