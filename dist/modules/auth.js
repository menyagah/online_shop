"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createRandomSessionId = exports.hashPassword = exports.comparePassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var client_1 = require("@prisma/client");
var uuid_1 = require("uuid");
var prisma = new client_1.PrismaClient();
var comparePassword = function (password, hash) {
    return bcrypt_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
var hashPassword = function (password) {
    return bcrypt_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
var createRandomSessionId = function () {
    return (0, uuid_1.v4)();
};
exports.createRandomSessionId = createRandomSessionId;
// Define the session duration in milliseconds (e.g., 15 minutes)
var SESSION_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
var protect = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionId, session, currentTimestamp, sessionExpirationTimestamp, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sessionId = req.headers.authorization.split(' ')[1];
                if (!sessionId) {
                    return [2 /*return*/, res.status(401).json({ message: 'Not authorized' }).end()];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.session.findUnique({
                        where: {
                            sessionId: sessionId,
                        },
                        include: {
                            user: true,
                        },
                    })];
            case 2:
                session = _a.sent();
                if (!session) {
                    return [2 /*return*/, res.status(401).json({ message: 'Not authorized' }).end()];
                }
                currentTimestamp = new Date().getTime();
                sessionExpirationTimestamp = new Date(session.createdAt).getTime() + SESSION_DURATION;
                if (currentTimestamp > sessionExpirationTimestamp) {
                    // Session has expired
                    return [2 /*return*/, res.status(401).json({ message: 'Session expired' }).end()];
                }
                // Update the session's updatedAt timestamp to prolong the session
                return [4 /*yield*/, prisma.session.update({
                        where: {
                            sessionId: sessionId,
                        },
                        data: {
                            updatedAt: new Date(),
                        },
                    })];
            case 3:
                // Update the session's updatedAt timestamp to prolong the session
                _a.sent();
                req.user = session.user;
                return [2 /*return*/, next()];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, res.status(401).json({ message: 'Not authorized' }).end()];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.protect = protect;
//# sourceMappingURL=auth.js.map