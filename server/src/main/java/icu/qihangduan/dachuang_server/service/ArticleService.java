package icu.qihangduan.dachuang_server.service;

import icu.qihangduan.dachuang_server.controller.user.dto.ArticleDto;
import icu.qihangduan.dachuang_server.pojo.Article;

import java.util.List;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 15:58
 * Description:
 */
public interface ArticleService {
    List<Article> getIndexArticles(int pageNum);

    void getArticleDetails(Article article);

    List<Article> getFocusedArticles(Long userId);

    Article getArticleById(Long id);

    Article getArticleInfoById(Long id);
}
