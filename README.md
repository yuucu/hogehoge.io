# hogehoge.io

## Requirement
- Docker

## Usage

```shell
$ git clone https://github.com/satokibi/hogehoge.io
$ cd hogehoge.io
$ cp dummy.env app.env
$ vim app.env
$ docker-compose up -d --build
$ docker-compose exec web /bin/ash
```

```terminal:コンテナ内
/app # cd hogehoge.io
/app/hogehoge.io # npm run dev
```

http://localhost:3002


