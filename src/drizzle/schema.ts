import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, serial, text, varchar } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull()
}) 

export const usersRelations = relations(users, ({ many }) => ({
    posts: many(posts)
}))

export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: varchar('title').notNull(),
    description: varchar('description').notNull(),
    content: text('content').notNull(),
    authorId: integer('author_id').notNull()
})

export const postsRelations = relations(posts, ({ one, many }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id]
    }),
    comments: many(comments)
}))

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull()
})

export const postCategories = pgTable('post_categories', {
    postId: integer('post_id').notNull().references(() => posts.id),
    categoryId: integer('category_id').notNull().references(() => categories.id)
}, (t) => ({
    pk: primaryKey({ columns: [t.postId, t.categoryId] })
}))

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
    post: one(posts, {
        fields: [postCategories.postId],
        references: [posts.id]
    }),
    category: one(categories, {
        fields: [postCategories.categoryId],
        references: [categories.id]
    })
}))

export const comments = pgTable('comments', {
    id: serial('id').primaryKey(),
    content: varchar('content').notNull(),
    userId: integer('user_id').notNull(),
    postId: integer('post_id').notNull()
})

export const commentsRelations = relations(comments, ({ one }) => ({
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id]
    })
}))