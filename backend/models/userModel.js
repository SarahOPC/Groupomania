// Requêtes SQL préparées
const sqlRequests = {
    sqlInsertUser : "INSERT INTO users (mail, password) VALUES (?, ?)",
    sqlFindUserMail : "SELECT * FROM users WHERE mail = ?",
    sqlFindUserPassword : "SELECT password FROM users WHERE mail = ?",
    sqlFindUserId : "SELECT id FROM users WHERE mail = ?"
};

module.exports = sqlRequests;