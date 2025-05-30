import { authors, posts } from "../db.js"

export const root = {
  posts() {
    return posts
  },
  addPost({ inputPost }) {
    if (inputPost.title.length < 5) {
      const err = Error("Input tidak valid: Judul terlalu pendek.")
      err.status = 422
      throw err
    }

    const author = authors.find((author) => author.id === inputPost.authorId)

    if (!author) {
      const err = Error("Author tidak ditemukan")
      err.status = 404
      throw err
    }

    const newPost = {
      id: Date.now().toString(),
      title: inputPost.title,
      content: inputPost.content,
      author, // sudah lengkap: id, name, nim, jurusan
    }

    posts.push(newPost)

    return newPost
  },
}
