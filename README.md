# Bank of dreams
[![Build Status](https://travis-ci.com/MatheoNieto/Bank-of-dreams.svg?branch=main)](https://travis-ci.com/MatheoNieto/Bank-of-dreams)

_Esta API esta con TypeScript, TypeORM, Express, Docker, MariaDB_

### Pre-requisitos 📋
Para hacer uso de la API se necesitan lo siguiente:

- Node.js
- NPM
- Docker
- Docker-compose
- Postman

### Instalación 🔧

_Para la instalación de estas herramientas se ingresa en los siguientes enlaces:_

- [Instalación de Node](https://nodejs.org/en/)
- [Instalación de Docker](https://docs.docker.com/get-docker/)
- [Instalación de Docker-compose](https://docs.docker.com/compose/install/)
- [Instalación de Postman](https://www.postman.com/)


## Comenzando 🚀
_Para obtener una copia del proyecto se debe clonar el repositorio o descargarlo como zip. Una vez se tenga el codigo en su ordenador abra la terminal, se dirige al directorio del proyecto y ponga el siguente comando:_

```
npm i
```
Una vez se haya instalado las dependencias del package.json se crea un archivo .env el cual se va a establecer las siguientes variables:
```
====> ESTAS VARIABLES SON PARA EL SERVICIO DE LA BD <===
HOST_DB
USER_DB
PASSWORD_DB
DATABASE
DATABASE_TEST

====> ESTAS VARIABLES SON PARA EL SERVIDOR <===
PORT
HOST_NAME
NODE_ENV ['development', 'production']

====> ESTAS VARIABLES SON PARA LOS JWT PARA LA AUTENTICACIÓN <===
ACCESS_TOKEN_SECRET
REFRESS_TOKEN_SECRET
```
Una vez haya establecido las variables de entorno se levanta los servicios de docker-compose:

```
sudo docker-compose up
```

una vez se haya iniciado los servicios podemos cosumir los servicios de la API con postman, en el siguiente link ingresa a la [collection de postman](https://documenter.getpostman.com/view/7841348/Tz5jfg2o) 
## Licencia 📄
Este proyecto está bajo la Licencia (GPL-3.0) - mira el archivo [LICENSE](LICENSE) para detalles