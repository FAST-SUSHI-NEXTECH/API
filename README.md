# API - API for the FAST SUSHI !

### Info 🍥
- main = server.js 
- /src/ = all requests

## If you want to build it locally 🏚️
#### 1. First git clone
```
git clone  https://github.com/FAST-SUSHI-NEXTECH/API.git
```
#### 2. Config db.connection to your db
```
const pool = mariadb.createPool({
    host: 'your_ip',
    port: db_port,
    user: 'user_db_name',
    password: 'your_password',
    database: 'db_name',
});
```   
#### 3. install node modules
```
npm install
```

## If you want to lunch it within a docker 🐳
#### 1. In the directory where there is Dockerfile:
```
docker build -t api_fast_image:1.0 .
```

#### 2. Run, assign a name, port-forwarding.
```
docker run -p 3000:3000 -d --name api_container api_fast_image:1.0
```
