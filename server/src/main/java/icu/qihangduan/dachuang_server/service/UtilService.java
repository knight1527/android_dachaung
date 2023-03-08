package icu.qihangduan.dachuang_server.service;

import icu.qihangduan.dachuang_server.pojo.*;

import java.util.List;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/7 15:34
 * Description:
 */
public interface UtilService {
    List<Type> getAllTypes();

    List<Level> getAllLevels();

    void focus(User currentUser, User user);

    void cancelFocus(User currentUser, User user);

    void likeArticle(User currentUser, Article article);

    void cancelLikeArticle(User currentUser, Article article);

    void favoritesArticle(User currentUser, Article article);
    void cancelFavoritesArticle(User currentUser, Article article);
    void favoritesEvents(User currentUser, Event event);
    void cancelFavoritesEvents(User currentUser, Event event);
}
