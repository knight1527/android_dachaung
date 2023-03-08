package icu.qihangduan.dachuang_server.service;

import icu.qihangduan.dachuang_server.pojo.Article;
import icu.qihangduan.dachuang_server.pojo.Event;

import java.util.List;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 15:58
 * Description:
 */
public interface EventService {
    List<Event> getIndexEvents(int pageNum);

    void getEventDetails(Event event);

    Event getEventById(Long id);

    Event getEventInfoById(Long id);
}
