FROM mysql:5

ADD my.cnf /etc/mysql/conf.d/my.cnf
COPY init_db.sql ./docker-entrypoint-initdb.d

RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_DATABASE=cho7
ARG MYSQL_USER=test
ARG MYSQL_PASSWORD=test
#ARG MYSQL_ROOT_PASSWORD=root

ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_ALLOW_EMPTY_PASSWORD=true
#ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD

CMD ["mysqld"]
EXPOSE 3306
EXPOSE 33060