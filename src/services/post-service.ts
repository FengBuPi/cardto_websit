import { db } from '@/lib/db';
import type { DataStorage } from '@/schema/data-storage';
import { dataStorage } from '@/schema/data-storage';
import { eq } from 'drizzle-orm';

/**
 * 数据访问层 - 文章服务
 * 负责处理所有与文章数据相关的数据库操作
 */

/**
 * 根据 ID 获取文章数据
 * @param id 文章 ID
 * @returns 文章数据或 null
 */
export async function fetchPostById(id: number): Promise<DataStorage | null> {
  try {
    const result = await db
      .select()
      .from(dataStorage)
      .where(eq(dataStorage.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching post by ID:', error);
    return null;
  }
}

/**
 * 根据用户 ID 获取所有文章
 * @param userId 用户 ID
 * @returns 文章列表
 */
export async function fetchPostsByUserId(userId: number): Promise<DataStorage[]> {
  try {
    const result = await db
      .select()
      .from(dataStorage)
      .where(eq(dataStorage.userId, userId))
      .orderBy(dataStorage.createdAt);

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching posts by user ID:', error);
    return [];
  }
}

/**
 * 获取所有文章
 * @returns 文章列表
 */
export async function fetchAllPosts(): Promise<DataStorage[]> {
  try {
    const result = await db
      .select()
      .from(dataStorage)
      .orderBy(dataStorage.createdAt);

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching all posts:', error);
    return [];
  }
}

/**
 * 创建新文章
 * @param data 文章数据
 * @returns 创建的文章数据
 */
export async function createPost(data: {
  userId: number;
  data: string;
}): Promise<DataStorage | null> {
  try {
    const result = await db
      .insert(dataStorage)
      .values({
        userId: data.userId,
        data: data.data,
      })
      .returning();

    return result[0] || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating post:', error);
    return null;
  }
}

/**
 * 更新文章
 * @param id 文章 ID
 * @param data 更新数据
 * @returns 更新后的文章数据
 */
export async function updatePost(
  id: number,
  data: {
    data?: string;
  }
): Promise<DataStorage | null> {
  try {
    const result = await db
      .update(dataStorage)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(dataStorage.id, id))
      .returning();

    return result[0] || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating post:', error);
    return null;
  }
}

/**
 * 删除文章
 * @param id 文章 ID
 * @returns 是否删除成功
 */
export async function deletePost(id: number): Promise<boolean> {
  try {
    const result = await db
      .delete(dataStorage)
      .where(eq(dataStorage.id, id))
      .returning();

    return result.length > 0;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting post:', error);
    return false;
  }
}
