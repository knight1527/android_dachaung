package icu.qihangduan.dachuang_server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import icu.qihangduan.dachuang_server.mapper.*;
import icu.qihangduan.dachuang_server.pojo.*;
import icu.qihangduan.dachuang_server.service.EventService;
import icu.qihangduan.dachuang_server.utils.MarkdownUtil;
import icu.qihangduan.dachuang_server.utils.OtherUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 15:59
 * Description:
 */
@Service
public class EventServiceImpl implements EventService {

    private static final int pageSize = 5;

    @Autowired
    private EventMapper eventMapper;
    @Autowired
    private FavoritesEventMapper favoritesEventMapper;
    @Autowired
    private CommentEventMapper commentEventMapper;
    @Autowired
    private TypeMapper typeMapper;
    @Autowired
    private LevelMapper levelMapper;
    @Autowired
    private UserFocusMapper userFocusMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public List<Event> getIndexEvents(int pageNum) {
        //分页每页pageSize条
        QueryWrapper<Event> wrapper = new QueryWrapper<>();
        wrapper.eq("is_published", 1).orderByAsc("id");
        Page<Event> page = new Page<>(pageNum, pageSize);
        IPage<Event> iPage = eventMapper.selectPage(page, wrapper);
        List<Event> tep = iPage.getRecords();
        /*System.out.println("====debug====\n" +
                tep.size() +
                "\n=======debug=======");*/
        List<Event> eventList = tep.subList( Math.min(tep.size(), (pageNum - 1) * pageSize) , Math.min(tep.size(),
                pageNum*pageSize));
        /*System.out.println(articleList.size());*/
        for (Event t : eventList){
            getEventDetails(t);
        }
        return eventList;
    }

    @Override
    public void getEventDetails(Event event) {
        //更新收藏集合
        event.setFavorites(favoritesEventMapper.selectList(new QueryWrapper<FavoritesEvent>().eq("event_id",
                event.getId())));
        /*article.setFavoritesNum(article.getFavorites().size());*/
        //获得评论列表
        event.setComments(commentEventMapper.selectList(new QueryWrapper<CommentEvent>().eq("event_id",
                event.getId())));
        //获取作者信息
        User user = userMapper.selectOne(new QueryWrapper<User>().eq("id", event.getUserId()));
        user.setPassword("");
        event.setUser(user);
        //获取type
        Type type = typeMapper.selectOne(new QueryWrapper<Type>().eq("id", event.getTypeId()));
        event.setType(type);
        //获取level
        Level level = levelMapper.selectOne(new QueryWrapper<Level>().eq("id", event.getLevelId()));
        event.setLevel(level);
        //获取状态
        Date now = new Date(System.currentTimeMillis());
        if(now.before(event.getRegisterEnd()) && now.after(event.getRegisterAt())){
            event.setStatus("报名中");
        }else if(now.before(event.getProgressEnd()) && now.after(event.getProgressAt())){
            event.setStatus("进行中");
        }else{
            event.setStatus("已结束");
        }
        //markdown转HTML
        event.setDescription(MarkdownUtil.genHTML(event.getDescription()));
    }

    @Override
    public Event getEventInfoById(Long id) {
        return eventMapper.selectOne(new QueryWrapper<Event>().eq("id", id));
    }

    @Override
    public Event getEventById(Long id) {
        Event event = eventMapper.selectOne(new QueryWrapper<Event>().eq("id", id));
        getEventDetails(event);
        return event;
    }

}
