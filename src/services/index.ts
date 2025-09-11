/**
 * 服务层统一导出
 * 提供所有数据访问层服务的统一入口
 */

export {
  createPost, deletePost, fetchAllPosts, fetchPostById,
  fetchPostsByUserId, updatePost
} from './post-service';
