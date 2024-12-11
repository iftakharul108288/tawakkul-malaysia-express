# tawakkul-malaysia-express

An **Express** backend with **Mongoose** ORM to add JSON files in MongoDB.

---

## Dependencies

- Node.js (v22.12.0)
- Express (v4.21.2)
- Mongoose (v8.8.4)

## How to work?

Open project terminal and run this command.

```bash
npm install
```

---

Create ```.env``` file in project directory and add the following lines.

```
MONGO_URI=<your_mongodb_uri>
PORT=<port_number>
```

---

Add the following lines in ```package.json```.

```json
{
    ...
    "main": "app.js",
    "type": "module",
    "scripts": {
        ...
        "start": "node app",
        "dev": "node --watch --env-file=.env app"
    }
}
```

---

Run in terminal

```bash
npm run dev
```

---

## NOTE

* Create a folder ```json```.
* Here, Create two folders ```course``` and ```university``` and add your JSON files.

---

Happy Coding!
