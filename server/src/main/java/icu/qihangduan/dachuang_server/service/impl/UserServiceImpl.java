package icu.qihangduan.dachuang_server.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import icu.qihangduan.dachuang_server.common.Constants;
import icu.qihangduan.dachuang_server.controller.user.dto.UserDto;
import icu.qihangduan.dachuang_server.exception.ServiceException;
import icu.qihangduan.dachuang_server.mapper.*;
import icu.qihangduan.dachuang_server.pojo.*;
import icu.qihangduan.dachuang_server.service.ArticleService;
import icu.qihangduan.dachuang_server.service.EventService;
import icu.qihangduan.dachuang_server.service.UserService;
import icu.qihangduan.dachuang_server.utils.MD5Utils;
import icu.qihangduan.dachuang_server.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/7 14:35
 * Description:
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;
    @Autowired
    ArticleMapper articleMapper;
    @Autowired
    EventMapper eventMapper;
    @Autowired
    UserFocusMapper userFocusMapper;
    @Autowired
    FavoritesMapper favoritesMapper;
    @Autowired
    FavoritesEventMapper favoritesEventMapper;

    @Override
    public User getUserInfo(UserDto userDto) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username", userDto.getUsername())
                .eq("password", MD5Utils.code(userDto.getPassword()));
        return userMapper.selectOne(wrapper);
    }

    @Override
    public User getUserInfoById(Long id) {
        return userMapper.selectOne(new QueryWrapper<User>().eq("id", id));
    }

    @Override
    public boolean insertUser(User user) {
        try {
            userMapper.insert(user);
        }catch(Exception e){
            return false;
        }
        return true;
    }

    @Override
    public UserDto login(UserDto userDto) {
        User rel = getUserInfo(userDto);
        if( rel != null){
            BeanUtil.copyProperties(rel, userDto, true);
            //得到token
            String token = TokenUtil.genToken(rel.getId().toString(), rel.getPassword());
            userDto.setToken(token);

            return userDto;
        }else{
            throw new ServiceException(Constants.CODE_600, "用户名或密码×！");
        }
    }

    @Override
    public UserDto register(UserDto userDto) {
        User user = new User();
        BeanUtil.copyProperties(userDto, user, true);
        String password = userDto.getPassword();
        user.setPassword(MD5Utils.code(password));
        user.setNickname(user.getUsername());
        user.setAvatar("https://rider-dachaung.oss-cn-hangzhou.aliyuncs.com/dachaung/Test/Pulling.jpg");
        System.out.println("before insert：" + user);
        boolean tag = insertUser(user);
        //查找user，查看插入成功与否
        user = getUserInfo(userDto);
        System.out.println("after insert： user" + user + "\n userdto: " + userDto);
        if(user != null){
            BeanUtil.copyProperties(user, userDto, true);
            //得到token
            String token = TokenUtil.genToken(user.getId().toString(), user.getPassword());
            userDto.setToken(token);
            userDto.setPassword(password);
            System.out.println("token: " + userDto);
            return userDto;
        }else{
            throw new ServiceException(Constants.CODE_600, "注册失败");
        }
    }

    /**
     * 查询账户是否存在
     * @param username
     * @return
     */
    @Override
    public User queryUserName(String username) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username",username);
        return userMapper.selectOne(wrapper);
    }

    @Override
    public User getUserByID(Long userID) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("id",userID);
        User user = userMapper.selectOne(wrapper);
        getUserDetail(user);
        return user;
    }

    /**
     * 获取user详情
     * @param user
     */
    @Override
    public void getUserDetail(User user) {
        //获取文章
        user.setArticles(articleMapper.selectList(new QueryWrapper<Article>().eq("user_id", user.getId())));
        //获取赛事
        user.setEvents(eventMapper.selectList(new QueryWrapper<Event>().eq("user_id", user.getId())));
        //获取关注用户
        List<UserFocus> focus = userFocusMapper.selectList(new QueryWrapper<UserFocus>().eq("user_id", user.getId()));
        List<User> focusUsers = focus.parallelStream().map(t -> {
            return userMapper.selectOne(new QueryWrapper<User>().eq("id", t.getFocusUserId()));
        }).collect(Collectors.toList());
        user.setFocus(focusUsers);
        user.setFocusNum(focusUsers.size());
        //获取粉丝用户
        List<UserFocus> focused = userFocusMapper.selectList(new QueryWrapper<UserFocus>().eq("focus_user_id",
                user.getId()));
        List<User> focusedUsers = focused.parallelStream().map(t -> {
            return userMapper.selectOne(new QueryWrapper<User>().eq("id", t.getUserId()));
        }).collect(Collectors.toList());
        user.setFocused(focusedUsers);
        user.setFocusedNum(focusedUsers.size());
        //获取收藏的文章
        List<Favorites> favorites = favoritesMapper.selectList(new QueryWrapper<Favorites>().eq("user_id",
                user.getId()));
        List<Article> articles = favorites.parallelStream().map(t -> {
            return articleMapper.selectOne(new QueryWrapper<Article>().eq("id", t.getArticleId()));
        }).collect(Collectors.toList());
        user.setFavoritesArticles(articles);
        //获取收藏的赛事
        List<FavoritesEvent> favoritesEvents = favoritesEventMapper.selectList(new QueryWrapper<FavoritesEvent>().eq(
                "user_id", user.getId()));
        List<Event> events = favoritesEvents.parallelStream().map(t -> {
            return eventMapper.selectOne(new QueryWrapper<Event>().eq("id", t.getEventId()));
        }).collect(Collectors.toList());
        user.setFavoritesEvents(events);
    }

}
