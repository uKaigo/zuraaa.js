zuraaa.js
=========

[![license](https://img.shields.io/npm/l/zuraaa.js)](https://github.com/uKaigo/zuraaa.js/blob/main/LICENSE) ![version](https://img.shields.io/badge/node->%3D%2014.0.0-brightgreen)

Uma api assíncrona para consumir a api do [zuraaa.com](https://github.com/zuraaa-projects/Zuraaa.com/wiki/Rest-API)

Documentação
------------

A documentação pode ser encontrada na [wiki](https://github.com/uKaigo/zuraaa.js/wiki).

Como usar
---------

### Usando CommonJS

Basta você fazer a destruturação de `Client`:

```js
const { Client } = require('zuraaa.js')

client = new Client()

async function getUser(id) {
    const user = await client.users.get(id)
    console.log(user.tag)
}

getUser('380441229416071170')
// Kaigo#0833
```

### ESModules

Você pode usar tanto a importação padrão quando destruturação:

```js
import Client from 'zuraaa.js'
// import { Client } from 'zuraaa.js'

client = new Client()

async function getBot(id) {
    const bot = await client.bots.get(id)
    console.log(bot.tag)
}

getBot('666825074850136076')
// Sora#4226
```
