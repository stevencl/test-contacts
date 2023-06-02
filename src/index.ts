import express from 'express';
import bodyParser from 'body-parser';

interface User {
  id: number;
  name: string,
  city: string;
}

const app = express();
const port = 3001;
let users: User[] = [];

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send(`User with ID ${id} not found`);
  }
});

app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.send('User added successfully');
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateUser = req.body;
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updateUser };
    res.send('User updated successfully');
  } else {
    res.status(404).send(`User with ID ${id} not found`);
  }
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.send('User deleted successfully');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
