# Use Node.js with full SSL/crypto support
FROM node:16-bullseye as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install required polyfills
RUN npm install crypto-browserify stream-browserify assert vite-plugin-node-polyfills --save-dev

# Copy the rest of the application files
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Install Nginx to serve the Vue.js app
FROM nginx:alpine

# Copy the built app to Nginx's public folder
COPY --from=build /app/public /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
