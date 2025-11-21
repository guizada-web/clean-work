import db from '../config/db.js';

export const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const createUser = (username, password, role) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, username, role });
    });
  });
};
