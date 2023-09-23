[Oficial documentation](https://sequelize.org/docs/v6/other-topics/migrations/)

### Install dependencies (in a new folder)
`npm install --save-dev sequelize-cli`
`npm install sequelize`

### Create the project
`npx sequelize-cli init`

### Edit Mysql credentials and config (add hostname, user password, etc)
`config/config.json`

### Create a new migration file (new table User)
`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

### Mysql package is required
`npm install mysql2`

### Edit the file (if necessary) and run the migration
`npx sequelize-cli db:migrate`

### Undo the last migration
`npx sequelize-cli db:migrate:undo`

### Seeds (adding data)
`npx sequelize-cli seed:generate --name demo-user`

### Running seeds
`npx sequelize-cli db:seed:all`

### Undo seed
`npx sequelize-cli db:seed:undo`
