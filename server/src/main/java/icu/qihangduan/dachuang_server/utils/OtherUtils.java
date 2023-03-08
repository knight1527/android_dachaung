package icu.qihangduan.dachuang_server.utils;

import icu.qihangduan.dachuang_server.pojo.Article;
import icu.qihangduan.dachuang_server.pojo.Event;
import icu.qihangduan.dachuang_server.service.ArticleService;
import icu.qihangduan.dachuang_server.service.EventService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/7 14:08
 * Description:
 */
public class OtherUtils {
    /**
     * 时间格式化相关
     * @param date
     * @return
     */
    public static String timeFormatter_second(Date date){
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sf.format(date);
    }
    public static String timeFormatter_day(Date date){
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        return sf.format(date);
    }

    /**
     * 给文章集合每个文章填充详细信息
     * @param list
     * @param articleService
     * @return
     */
    public static List<Article> fillContent(List<Article> list, ArticleService articleService){
        for (Article a : list){
            articleService.getArticleDetails(a);
        }
        return list;
    }

    /**
     * 给赛事集合每个赛事填充详细信息
     * @param list
     * @param eventService
     * @return
     */
    public static List<Event> fillContent(List<Event> list, EventService eventService){
        for (Event a : list){
            eventService.getEventDetails(a);
        }
        return list;
    }
}
