// Requêtes SQL préparées
const sqlRequests = {
    sqlCreateComment: 'INSERT INTO comments (`text`, `userId`, `postId`) VALUES (?, ?, ?)',
    sqlDeleteComment: 'DELETE FROM comments WHERE id = ?',
    sqlGetAllComments: 'SELECT * FROM comments WHERE postId = ?',
    sqlGetRole: "SELECT role FROM users WHERE id = ?"
};

module.exports = sqlRequests;