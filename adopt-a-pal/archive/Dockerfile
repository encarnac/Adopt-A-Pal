# # Base image
# FROM node:16.10.0-alpine

# # Install Python and pip
# RUN apk add --update py-pip python3-dev build-base

# # Set working directory to /adopt-a-pet
# WORKDIR /adopt-a-pet

# # Copy package.json and package-lock.json to /adopt-a-pet
# COPY package*.json ./

# # Install Node.js dependencies
# RUN npm install

# # Set working directory to /adopt-a-pet/api
# WORKDIR /adopt-a-pet/api

# # Copy requirements.txt to /adopt-a-pet/api
# COPY requirements.txt .

# # Install Python dependencies
# RUN pip install -r requirements.txt

# # Set working directory to /adopt-a-pet
# WORKDIR /adopt-a-pet

# # Copy all files to /adopt-a-pet
# COPY . .

# # Build the React app
# RUN npm run build

# # Expose port 3000 for the React app and 5000 for the Flask API
# EXPOSE 3000
# EXPOSE 5000

# # Run the application
# CMD ["npm", "start"]