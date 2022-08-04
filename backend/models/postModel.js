// Requêtes SQL préparées
const sqlRequests = {
    sqlGetAllPosts : "SELECT *, (SELECT avatar FROM users WHERE users.id = posts.userId) AS avatar, (SELECT role FROM users WHERE users.id = posts.userId) AS role, (SELECT value FROM likesdislikes WHERE likesdislikes.userId = posts.userId AND likesdislikes.postId = posts.id) AS liked FROM posts",
    sqlGetOnePost : "SELECT * FROM posts WHERE id = ?",
    sqlDeletePost : "DELETE FROM posts WHERE id = ?",
    sqlUpdatePost : "UPDATE posts SET text = ?, image = ?, userId = ? WHERE id = ?" ,
    sqlCreatePost: "INSERT INTO posts (`text`, `image`, `userId`) VALUES (?, ?, ?)",
    sqlGetOneForDelete : "SELECT image FROM posts WHERE id = ?",
    sqlCreatingLike: "INSERT INTO likesdislikes (`postId`, `userId`, `value`) VALUES (?, ?, ?)",
    sqlDeletingLike: "DELETE FROM likesdislikes WHERE postId = ? AND userId = ?",
    sqlGetRating: "SELECT value FROM likesdislikes WHERE postId = ? AND userId = ?",
    sqlGetRole: "SELECT role FROM users WHERE id = ?",
    sqlGetUserIdFromTablePosts: "SELECT userId FROM posts WHERE id = ?"
};

module.exports = sqlRequests;