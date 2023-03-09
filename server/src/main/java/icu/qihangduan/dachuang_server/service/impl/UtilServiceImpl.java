package icu.qihangduan.dachuang_server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import icu.qihangduan.dachuang_server.mapper.*;
import icu.qihangduan.dachuang_server.pojo.*;
import icu.qihangduan.dachuang_server.service.UtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/7 15:35
 * Description:
 */
@Service
public class UtilServiceImpl implements UtilService {
    @Autowired
    LevelMapper levelMapper;
    @Autowired
    TypeMapper typeMapper;
    @Autowired
    UserFocusMapper userFocusMapper;
    @Autowired
    LikesMapper likesMapper;
    @Autowired
    FavoritesMapper favoritesMapper;
    @Autowired
    FavoritesEventMapper favoritesEventMapper;


    @Override
    public List<Type> getAllTypes() {
        return typeMapper.selectList(new QueryWrapper<Type>());
    }

    @Override
    public List<Level> getAllLevels() {
        return levelMapper.selectList(new QueryWrapper<Level>());
    }

    @Override
    public void focus(User currentUser, User user) {
        UserFocus tep = new UserFocus();
        tep.setUserId(currentUser.getId());
        tep.setFocusUserId(user.getId());
        userFocusMapper.insert(tep);
    }

    @Override
    public void cancelFocus(User currentUser, User user) {
        userFocusMapper.delete(new QueryWrapper<UserFocus>().eq("user_id", currentUser.getId()).eq("focus_user_id",
                user.getId()));
    }

    @Override
    public void likeArticle(User currentUser, Article article) {
        Likes likes = new Likes();
        likes.setUserId(currentUser.getId());
        likes.setArticleId(article.getId());
        likes.setCreatedAt(new Date());
        System.out.println(likesMapper.insert(likes));
    }
    @Override
    public void cancelLikeArticle(User currentUser, Article article) {
        System.out.println(likesMapper.delete(new QueryWrapper<Likes>().eq("user_id", currentUser.getId()).eq("article_id",
                article.getId())));
    }

    @Override
    public void favoritesArticle(User currentUser, Article article) {
        Favorites favorites = new Favorites();
        favorites.setUserId(currentUser.getId());
        favorites.setArticleId(article.getId());
        favorites.setCreatedAt(new Date());
        favoritesMapper.insert(favorites);
    }

    @Override
    public void cancelFavoritesArticle(User currentUser, Article article) {
        favoritesMapper.delete(new QueryWrapper<Favorites>().eq("user_id", currentUser.getId()).eq("article_id",
                article.getId()));
    }

    @Override
    public void favoritesEvents(User currentUser, Event event) {
        FavoritesEvent favorites = new FavoritesEvent();
        favorites.setUserId(currentUser.getId());
        favorites.setEventId(event.getId());
        favorites.setCreatedAt(new Date());
        favoritesEventMapper.insert(favorites);
    }

    @Override
    public void cancelFavoritesEvents(User currentUser, Event event) {
        favoritesEventMapper.delete(new QueryWrapper<FavoritesEvent>().eq("user_id",currentUser.getId()).eq("event_id", event.getId()));
    }
}
