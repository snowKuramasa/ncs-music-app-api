"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)()); // CORSを有効にする
app.use((0, cors_1.default)({
    //FIXME:開発中のため、どのドメインからでもアクセス可能にする
    origin: true,
    // origin: ['https://ncs-music-app-api.vercel.app'],
}));
app.use(express_1.default.json());
// CRUDエンドポイントの定義
//test用
app.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({
        front: 'Next.js',
        Server: 'Express',
        message: 'Welcome! NCS Music App',
    });
});
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({
        data: { name, email },
    });
    res.json(user);
});
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
    });
    res.json(user);
});
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
    });
    res.json(user);
});
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: { id: Number(id) },
    });
    res.json(user);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
