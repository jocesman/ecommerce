"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerGlobal = void 0;
const chalk = require("chalk");
const LoggerGlobal = (req, res, next) => {
    const start = process.hrtime();
    const { method, originalUrl } = req;
    const userAgent = req.headers['user-agent'] || 'N/A';
    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const durationInMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
        console.log(chalk.whiteBright.bold(`[${formatearFechaPersonalizada(new Date())}]`) + ' ' +
            chalk.cyan.bold('[HttpRequestLogger]') + ' ' +
            chalk.gray('•') + ' ' +
            chalk.green('Método:') + ' ' + chalk.bold.yellow(method) + ' ' +
            chalk.gray('|') + ' ' +
            chalk.green('Ruta:') + ' ' + chalk.bold.blue(originalUrl) + ' ' +
            chalk.gray('|') + ' ' +
            chalk.green('Estado:') + ' ' + chalk.bold.magenta(res.statusCode) + ' ' +
            chalk.gray('|') + ' ' +
            chalk.green('Tiempo:') + ' ' + chalk.bold.red(`${durationInMs} ms`) + ' ' +
            chalk.gray('|') + ' ' +
            chalk.green('Agente:') + ' ' + chalk.italic.white(userAgent));
    });
    res.on('error', (err) => {
        const timestamp = new Date().toISOString();
        console.error(`${chalk.gray(`[${timestamp}]`)} ${chalk.red('[HttpRequestLogger]')} ❌ ` +
            `${chalk.redBright('ERROR en')} ${chalk.bold(method)} ${chalk.underline(originalUrl)}: ${chalk.red(err.message)}`);
    });
    next();
};
exports.LoggerGlobal = LoggerGlobal;
const formatearFechaPersonalizada = (fecha) => {
    const dia = fecha.getDate();
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const mesNombre = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    let hora = fecha.getHours();
    const minuto = fecha.getMinutes().toString().padStart(2, '0');
    const segundo = fecha.getSeconds().toString().padStart(2, '0');
    const ampm = hora >= 12 ? 'p.m.' : 'a.m.';
    hora = hora % 12 || 12;
    return `${dia} de ${mesNombre} de ${anio}, ${hora}:${minuto}:${segundo} ${ampm}`;
};
//# sourceMappingURL=logger.middleware.js.map