# Ayudantia 3:  **Docker, Docker Compose, Conexion a la base de datos y Dockerizando aplicacion**

Creado por Carlos Arredondo

Template base, pero modificado: **[Repositorio base](https://github.com/carlosarredondoc/control-1-rest-api-koa)**

## El repositorio contiene 2 ramas

Basadas en el **Repositorio base**

Rama **mongodb**: Se utiliza [mongoose](https://mongoosejs.com/docs/) para realizar la conexion a la respectiva base de datos.

Rama **postgresql**: Se utiliza [sequelize](https://sequelize.org/docs/v6/getting-started/) con las dependencias de postgres para realizar la conexion a la respectiva base de datos.

# Docker
## ¿Que es Docker?

Docker es una plataforma la cual permite generar entornos aislados, los cuales se llaman **contenedores**, estos incluyen todo lo necesario para que nuestro software pueda ejecutarse correctamente, bibliotecas, codigos, herramientas del sistema, etc.

## Funcionamiento

Docker utiliza un repositorio llamado [Docker Hub](https://hub.docker.com/search?q=) el cual contiene imagenes de diferentes aplicaciones, proyectos, sitemas operativos, etc. Estas son archivos que contienen codigo el cual permite instalar, dependencias, realizar configuraciones entre muchas otras cosas.

Uno al levantar un contenedor este primero busca en el repositorios de imagenes local, en caso de no existir la descargara de internet, para posteriormente crear el entorno, tambien se pueden tener entornos apagados  para posteriormente iniciar el contenedor y seguir trabajando en algun proyecto.

## Utilidad de docker

----

Permite realizar la portabilidad de la aplicacion en diferentes entornos, despliegue mas sencillo sin afectar en gran medida al sistema operativo del hospedador.


## Instalacion

### Windows

Pagina Oficial: [Docker Windows](https://docs.docker.com/desktop/install/windows-install/)

Docker en Windows requiere el uso de WSL2 o Hyper-V hablitado


### Linux

Pagina Oficial: [Docker Linux](https://docs.docker.com/desktop/install/linux-install/)

Docker en Linux verificar la habilitacion del soporte de KVM

Seleccionar su distribucion de preferencia.


### MacOS

Pagina Oficial: [Docker MacOS](https://docs.docker.com/desktop/install/mac-install/)

Seleccionar el procesador **Intel** o **Apple Silicon**


# Docker Compose

## ¿Que es Docker Compose?

Es un orquestador dockers, es decir, un programa que permite controlar y automatizar el levantamiento de contenedores. A traves de un archivo .yml.

## Utilidad de docker compose

Cuando tenemos multiples contendores, se nos hace muy dificil administrarlos todos, en este caso entra docker compose, ya que permite levantar contenedores por proyecto, clientes, etc.

# Levantando base de datos usando Docker Compose

## MongoDB:
Iniciar:
~~~
docker-compose -f Docker-compose.mongodb.yml up
~~~

Detener:
~~~
docker-compose -f Docker-compose.mongodb.yml stop
~~~

## PostgreSQL
Iniciar:
~~~
docker-compose -f Docker-compose.postgresql.yml up
~~~
Detener:
~~~
docker-compose -f Docker-compose.postgresql.yml stop
~~~

## Comando utiles docker compose
**OJO**: Si el archivo no se llama **Docker-compose.yml**, el comando docker-compose no lo reconocera y debe ser pasado el nuevo nombre con la opcion -f (docker compose -f Docker-compose.postgresql.yml)

~~~
- Lista los contenedores en ejecución:
    docker compose ps

  - Crea e inicia todos los contenedores en segundo plano usando el archivo docker-compose.yml en el directorio actual:
    docker compose up --detach

  - Inicia todos los contenedores y reconstruye si es ncesario:
    docker compose up --build

  - Inicia todos los contenedores usando un archivo compose alternativo:
    docker compose --file ruta/al/directorio up

  - Detiene todos los contenedores en ejecución:
    docker compose stop

  - Detiene y elimina todos los contenedores, redes, imágenes y volúmenes:
    docker compose down --rmi all --volumes

  - Sigue los registros de todos los contenedores:
    docker compose logs --follow

  - Sigue los registros de un contenedor específico:
    docker compose logs --follow nombre_de_contenedor
~~~

# Instalacion Estandar Base De Datos

## MongoDB

Pagina Oficial: [MongoDB](https://www.mongodb.com/try/download/community-edition)

Seleccionar Platform (Windows, Ubuntu, MacOS)

Package (Windows): MSI

Package (Ubuntu): server

Package (MacOS): tgz

Descargar la ultima version

## PostgreSQL

Pagina Oficial: [PostgreSQL](https://www.postgresql.org/download/)

Seleccionar plataforma.

Windows y MacOs: Se abrira otra ventana y se debe seleccionar **Download the installer**

Descargar la ultima version


# Visualizacion de los datos en la base de datos

## Visualizador de MongoDB

Pagina Oficial: [MongoDB Compass](https://www.mongodb.com/try/download/compass)

Buscar **MongoDB Compass Download (GUI)**

Seleccionar su plataforma.

## Visualizador de PostgreSQL

Pagina Oficial: [PgAdmin](https://www.pgadmin.org/download/)

En la seccion **pgAdmin 4**, seleccione su sistema operativo de preferencia.

# Otras alternativas de base de datos:

[MongoDBAtlas](https://www.mongodb.com/atlas/database): Alternativa en la nube de mongodb contiene un plan gratuito (Plan Shared)

[Cloud Firestore](https://firebase.google.com/docs/firestore?hl=es-419): base de datos NoSQL de Google tiene plan gratuito

Entre otras mas...

