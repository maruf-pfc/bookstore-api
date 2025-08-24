# Stage 1: Build the application
# Use the official Bun image as a builder environment
FROM oven/bun:1 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and the lockfile to leverage Docker's layer caching
COPY package.json bun.lockb ./

# Install all dependencies, including devDependencies needed for the build
RUN bun install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Run the build script to transpile TypeScript to JavaScript
RUN bun run build


# Stage 2: Create the final production image
# Start from a clean, lightweight Bun image
FROM oven/bun:1

# Set the working directory
WORKDIR /app

# Set the environment to production to optimize performance
ENV NODE_ENV=production

# Copy package.json and lockfile from the builder stage
COPY --from=builder /app/package.json /app/bun.lockb ./

# Install only the production dependencies to keep the image small
RUN bun install --frozen-lockfile --production

# Copy the compiled JavaScript code from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port your application will run on (e.g., 5555)
# Make sure to set this port in your .env file or server configuration
EXPOSE 5555

# The command to start the application
# This executes the "start" script from your package.json
CMD ["bun", "start"]