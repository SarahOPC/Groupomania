// Requêtes SQL préparées
const sqlRequests = {
    sqlGetAllPosts : "SELECT * FROM posts",
    sqlGetOnePost : "SELECT * FROM posts WHERE id = ?",
    sqlDeletePost : "DELETE FROM posts WHERE id = ?",
    sqlUpdatePost : "UPDATE posts SET text = ?, image = ?, userId = ? WHERE id = ?" ,
    sqlCreatePost: "INSERT INTO posts (`text`, `image`, `userId`) VALUES (?, ?, ?)",
    sqlGetOneForDelete : "SELECT image FROM posts WHERE id = ?",
    sqlLikesDislikes : "SELECT * FROM likesdislikes WHERE postId = ? AND userId = ?",
    sqlCreatingLike: "INSERT INTO likesdislikes (`postId`, `userId`, `value`) VALUES (?, ?, ?)",
    sqlDeletingLike: "DELETE FROM likesdislikes WHERE postId = ? AND userId = ?"
};

module.exports = sqlRequests;