package icu.qihangduan.dachuang_server.controller;

import icu.qihangduan.dachuang_server.common.Resp;
import icu.qihangduan.dachuang_server.service.ArticleService;
import icu.qihangduan.dachuang_server.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 16:51
 * Description:
 */
@RestController
@RequestMapping(value = "/article")
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @GetMapping(value = "/index")
    public Resp getIndex(
           @RequestParam(value = "pageNum")int pageNum
    ){
        return Resp.success(articleService.getIndexArticles(pageNum));
    }
    @GetMapping(value = "/index_f")
    public Resp getIndexFocus(){
        return Resp.success(articleService.getFocusedArticles(Objects.requireNonNull(TokenUtil.getCurrentUser()).getId()));
    }

    @GetMapping(value = "detail")
    public Resp getArticleDetails(
            @RequestParam(value = "articleId")Long articleId
    ){
        return Resp.success(articleService.getArticleById(articleId));
    }
}
