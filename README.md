zuraaa.js
=========

Uma api assíncrona para consumir a api do [zuraaa.com](https://github.com/zuraaa-projects/Zuraaa.com/wiki/Rest-API)

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
