# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the build folder from your local machine to the container
COPY ./build /app/build

# Install serve globally to serve static files
RUN npm install -g serve

# Expose the port the app will be accessible on
EXPOSE 3000

# Command to serve the static build folder
CMD ["serve", "-s", "build", "-l", "3000"]
