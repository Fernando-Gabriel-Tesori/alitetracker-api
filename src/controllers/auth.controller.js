"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const clientId = 'Ov23lieliyoshk42hOoA';
const clienteSecret = 'd1ccafdc830259ae94fb9afbc30379934f937b0b';
class AuthController {
    constructor() {
        this.auth = async (request, response) => {
            const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
            response.redirect(redirectUrl);
        };
        this.authCallback = async (request, response) => {
            console.log(request.query);
            return response.send();
        };
    }
}
exports.AuthController = AuthController;
