### List virtual networks
`docker network ls`

### Delete a network
`docker network rm network-id`

### Create a docker network
`docker network create network-name`

### Create Docker php 8.2:
`docker build -t machine-name -f Dockerfile-php8.2 .`

### Run docker php 8.2:
`docker run -p 8081:80 -v ./php:/var/www/html --network network-name machine-name`

### Create mysql docker machine
`docker build -t mysql-container -f Dockerfile-mysql .`

### List docker images
`docker images`

### Run Mysql docker
`docker run -p 3306:3306 --name mysql-instance --network network-name -d mysql-container`

### Create database
`docker exec -it mysql-instance mysql -uroot -pmysecretpassword -e "CREATE DATABASE mydatabase;"`

### Check docker processes 
`docker ps -a`

### Run a process by name
`docker run machine-name`

### Run json-server
`json-server --watch db.json`

### Create a Redis machine
`docker run -d --name redis-stack-server --network network-name -p 6379:6379 redis/redis-stack-server:latest`
