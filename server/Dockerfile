FROM kkarczmarczyk/node-yarn
COPY . .
RUN yarn
RUN echo '{"host":"149.202.58.150","port":"3306","user":"root","database":"cho7"}' > db/db-identifiants.json
VOLUME /public /public
EXPOSE 8180
CMD [ "node","server.js" ]