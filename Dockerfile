FROM node:17-alpine

COPY . .

RUN npm i
RUN npm i -g vite

EXPOSE 5000

RUN npm run build --force
CMD vite preview --port 5000 --host 0.0.0.0