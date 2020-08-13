module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "292512November",
    DB:"post_ut",
    dialect:"mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle:10000
    }
}