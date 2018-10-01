FROM node:latest

WORKDIR /var/www/angularnoderestfulservice

RUN npm install nodemon -g

EXPOSE 3030

ENTRYPOINT ["nodemon", "server.js"]













# Build: docker build -f node.dockerfile -t ricckrone/node .

# Option 1
# Start MongoDB and Node (link Node to MongoDB container with legacy linking)

# docker run -d --name mongodb mongo
# docker run -d -p 3030:3030 --link mongodb --name nodeapp ricckrone/node

# Option 2: Create a custom bridge network and add containers into it

# docker network create --driver bridge isolated_network
# docker run -d --net=isolated_network --name mongodb mongo
# docker run -d --net=isolated_network --name nodeapp -p 3030:3030 ricckrone/node

# Option 3: Use Docker Compose

# docker-compose build
# docker-compose up

# Seed the database with sample database
# Run: docker exec nodeapp node lib/dbSeeder.js
