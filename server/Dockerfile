FROM kkarczmarczyk/node-yarn
COPY . .
RUN yarn
RUN echo '{"host":"192.168.99.100","port":"3306","user":"root","database":"cho7"}' > db/db-identifiants.json
VOLUME /public /public
EXPOSE 8180
CMD [ "node","server.js" ]