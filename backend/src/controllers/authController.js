import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByUsername, createUser } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error });
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) return res.status(400).json({ message: 'Usuário já existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, hashedPassword, 'user');
    res.status(201).json({ message: 'Usuário criado', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro no registro', error });
  }
};
