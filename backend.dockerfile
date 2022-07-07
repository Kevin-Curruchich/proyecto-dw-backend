## BUILD
# docker build -t backend:0.1.0 -f backend.dockerfile .

## RUN
# docker run -p 8080:8080 -d -e ORACLE_USER=appuser -e ORACLE_PASS=holamundo -e ORACLE_CONNSTR=172.17.0.2:1521/xepdb1 -d backend:0.1.0

FROM oraclelinux:8.6

#Install oracle client
RUN dnf install oracle-instantclient-release-el8 -y
RUN dnf install oracle-instantclient-basic -y

#Install nodejs
RUN dnf module install nodejs:16 -y

# ENV SERVER_PORT=8080 \
#    ORACLE_USER=appuser \
#    ORACLE_PASS=holamundo \
#    ORACLE_CONNSTR=172.17.0.2:1521/xepdb1

# Copy application
COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm","start"]