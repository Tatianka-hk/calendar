import chalk from "chalk";

export enum StatusEnum {
    SUCCESS = "success",
    ERROR = "error",
}

export default class Logger {
    info(header: string, message: string, status?: any) {
        const messageLog = `${header}: ${message}`;
        switch (status) {
            case StatusEnum.SUCCESS:
                console.log(chalk.green(messageLog));
                break;
            case StatusEnum.ERROR:
                console.log(chalk.red(messageLog));
                break;
        }
    }
}
