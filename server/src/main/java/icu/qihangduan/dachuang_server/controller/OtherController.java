package icu.qihangduan.dachuang_server.controller;

import icu.qihangduan.dachuang_server.common.Constants;
import icu.qihangduan.dachuang_server.common.Resp;
import icu.qihangduan.dachuang_server.pojo.Article;
import icu.qihangduan.dachuang_server.pojo.Event;
import icu.qihangduan.dachuang_server.pojo.User;
import icu.qihangduan.dachuang_server.service.ArticleService;
import icu.qihangduan.dachuang_server.service.EventService;
import icu.qihangduan.dachuang_server.service.UtilService;
import icu.qihangduan.dachuang_server.utils.TokenUtil;
import org.apache.poi.ss.formula.functions.Even;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/7 15:33
 * Description:
 */
@RestController
public class OtherController {
    @Autowired
    UtilService utilService;
    @Autowired
    ArticleService articleService;
    @Autowired
    EventService eventService;

    @GetMapping(value = "/type")
    public Resp getAllTypes(){
        return Resp.success(utilService.getAllTypes());
    }
    @GetMapping(value = "/level")
    public Resp getAllLevels(){
        return Resp.success(utilService.getAllLevels());
    }

    /**
     * 点赞文章
     * @return
     */
    @GetMapping(value = "/like")
    public Resp likeArticles(
            @RequestParam(value = "articleId")Long articleId
    ){
        Article article = articleService.getArticleInfoById(articleId);
        User currentUser = TokenUtil.getCurrentUser();
        utilService.likeArticle(currentUser, article);
        return Resp.success();
    }
    /**
     * 取消点赞文章
     * @return
     */
    @GetMapping(value = "/cancelLike")
    public Resp cancelLikeArticles(
            @RequestParam(value = "articleId")Long articleId
    ){
        Article article = articleService.getArticleInfoById(articleId);
        User currentUser = TokenUtil.getCurrentUser();
        utilService.cancelLikeArticle(currentUser, article);
        return Resp.success();
    }

    /**
     * 收藏文章
     * @param articleId
     * @return
     */
    @GetMapping(value = "/favorites_a")
    public Resp favoritesArticles(
            @RequestParam(value = "articleId")Long articleId
    ){
        Article article = articleService.getArticleInfoById(articleId);
        User currentUser = TokenUtil.getCurrentUser();
        utilService.favoritesArticle(currentUser, article);
        return Resp.success();
    }
    /**
     * 收藏文章
     * @param articleId
     * @return
     */
    @GetMapping(value = "/cancel_favorites_a")
    public Resp cancelFavoritesArticles(
            @RequestParam(value = "articleId")Long articleId
    ){
        Article article = articleService.getArticleInfoById(articleId);
        User currentUser = TokenUtil.getCurrentUser();
        utilService.cancelFavoritesArticle(currentUser, article);
        return Resp.success();
    }
    /**
     * 收藏赛事
     * @param eventId
     * @return
     */
    @GetMapping(value = "/favorites_e")
    public Resp favoritesEvents(
            @RequestParam(value = "eventId")Long eventId
    ){
        Event event = eventService.getEventInfoById(eventId);
        User currentUser = TokenUtil.getCurrentUser();
        utilService.favoritesEvents(currentUser, event);
        return Resp.success();
    }
    /**
     * 取消收藏赛事
     * @param eventId
     * @return
     */
    @GetMapping(value = "/cancel_favorites_e")
    public Resp cancelFavoritesEvents(
            @RequestParam(value = "eventId")Long eventId
    ){
        Event event = eventService.getEventInfoById(eventId);
        User currentUser = TokenUtil.getCurrentUser();
        utilService.cancelFavoritesEvents(currentUser, event);
        return Resp.success();
    }
}
