// Requêtes SQL préparées
const sqlRequests = {
    sqlCreateComment: 'INSERT INTO comments (`text`, `userId`, `postId`) VALUES (?, ?, ?)',
    sqlDeleteComment: 'DELETE FROM comments WHERE id = ?',
    sqlGetAllComments: 'SELECT * FROM comments WHERE postId = ?'

};

module.exports = sqlRequests;