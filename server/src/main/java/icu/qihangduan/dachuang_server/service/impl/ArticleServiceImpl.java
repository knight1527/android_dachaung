package icu.qihangduan.dachuang_server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import icu.qihangduan.dachuang_server.controller.user.dto.ArticleDto;
import icu.qihangduan.dachuang_server.mapper.*;
import icu.qihangduan.dachuang_server.pojo.*;
import icu.qihangduan.dachuang_server.service.ArticleService;
import icu.qihangduan.dachuang_server.utils.MarkdownUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 15:58
 * Description:
 */
@Service
public class ArticleServiceImpl implements ArticleService {
    private static final int pageSize = 5;

    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private TagMapper tagMapper;
    @Autowired
    private LikesMapper likesMapper;
    @Autowired
    private FavoritesMapper favoritesMapper;
    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private ArticleTagMapper articleTagMapper;
    @Autowired
    private UserFocusMapper userFocusMapper;
    @Autowired
    private UserMapper userMapper;

    /**
     * @param pageNum 页码（默认五条为一页）
     * @return
     */
    @Override
    public List<Article> getIndexArticles(int pageNum) {
        //分页每页pageSize条
        QueryWrapper<Article> wrapper = new QueryWrapper<>();
        wrapper.eq("is_published", 1).orderByAsc("id");
        Page<Article> page = new Page<>(pageNum, pageSize);
        IPage<Article> iPage = articleMapper.selectPage(page, wrapper);
        List<Article> tep = iPage.getRecords();
        /*System.out.println("====debug====\n" +
                tep.size() +
                "\n=======debug=======");*/
        List<Article> articleList = tep.subList( Math.min(tep.size(), (pageNum - 1) * pageSize) , Math.min(tep.size(), pageNum*pageSize));
        /*System.out.println(articleList.size());*/
        for (Article t : articleList){
            getArticleDetails(t);
        }
        return articleList;
    }

    /**
     * 获取文章其他详情
     * @param article
     */
    @Override
    public void getArticleDetails(Article article) {
        //查询文章的所有标签id
        List<ArticleTag> tagIds = articleTagMapper.selectList(new QueryWrapper<ArticleTag>().eq("article_id",
                article.getId()));
        //通过id查询到标签列表
        List<Tag> tags = tagIds.parallelStream().map(t -> {
            return tagMapper.selectOne(new QueryWrapper<Tag>().eq("id", t.getTagId()));
        }).collect(Collectors.toList());
        article.setTags(tags);

        //更新点赞集合
        article.setLikes(likesMapper.selectList(new QueryWrapper<Likes>().eq("article_id", article.getId())));
        /*article.setLikesNum(article.getLikes().size());*/
        //更新收藏集合
        article.setFavorites(favoritesMapper.selectList(new QueryWrapper<Favorites>().eq("article_id", article.getId())));
        /*article.setFavoritesNum(article.getFavorites().size());*/
        //获得评论列表
        article.setComments(commentMapper.selectList(new QueryWrapper<Comment>().eq("article_id", article.getId())));
        //获取作者信息
        User user = userMapper.selectOne(new QueryWrapper<User>().eq("id", article.getUserId()));
        user.setPassword("");
        article.setUser(user);
    }

    @Override
    public List<Article> getFocusedArticles(Long userId) {
        List<UserFocus> focus = userFocusMapper.selectList(new QueryWrapper<UserFocus>().eq("user_id", userId));
        List<Article> articleList = new ArrayList<>();
        for (UserFocus f : focus) {
            articleList.addAll(articleMapper.selectList(new QueryWrapper<Article>().eq("user_id", f.getFocusUserId())));
        }
        for (Article t : articleList){
            getArticleDetails(t);
        }
        return articleList;
    }

    @Override
    public Article getArticleById(Long id) {
        Article article = articleMapper.selectOne(new QueryWrapper<Article>().eq("id", id));
        getArticleDetails(article);
        return article;
    }

    @Override
    public Article getArticleInfoById(Long id) {
        return articleMapper.selectOne(new QueryWrapper<Article>().eq("id", id));
    }
}
