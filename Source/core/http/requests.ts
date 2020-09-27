import {BodyRequest} from "./interfaces/body";


const request = require('request');

export class Requests {

    /**
     * Отправка get запроса.
     *
     * @param {BodyRequest} body тело запроса.
     */
    public static async get(body: BodyRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            request.get(body, (error, response) => {
                if(error) {
                    return reject(error);
                }
                return resolve(response);
            });
        });
    };

    /**
     * Отправка post запроса.
     *
     * @param {BodyRequest} body тело запроса.
     */
    public static async post(body: BodyRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            request.post(body, (error, response) => {
                if(error) {
                    return reject(error);
                }
                return resolve(response);
            });
        });
    };

}
