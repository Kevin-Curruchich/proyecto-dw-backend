
## Create Oracle Database
docker run -d -p 1521:1521 \
-e ORACLE_PASSWORD=syspass \
-e APP_USER=appuser \
-e APP_USER_PASSWORD=holamundo \
-v oracle-volume:/opt/oracle/oradata \
-v /home/kevin/proyect/init:/container-entrypoint-initdb.d \
gvenzl/oracle-xe

## Backend
docker run -d -p 1521:1521 \
-e ORACLE_PASSWORD=syspass \
-e APP_USER=appuser \
-e APP_USER_PASSWORD=holamundo \
-v /home/kevin/proyect/init:/container-entrypoint-initdb.d \
gvenzl/oracle-xe
