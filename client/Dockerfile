FROM kkarczmarczyk/node-yarn
COPY . .
RUN yarn run build
RUN yarn global add serve
CMD ["serve", "-p", "80", "-s", "."]
EXPOSE 80

