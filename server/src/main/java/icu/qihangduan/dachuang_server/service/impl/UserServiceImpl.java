package icu.qihangduan.dachuang_server.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import icu.qihangduan.dachuang_server.common.Constants;
import icu.qihangduan.dachuang_server.controller.user.dto.UserDto;
import icu.qihangduan.dachuang_server.exception.ServiceException;
import icu.qihangduan.dachuang_server.mapper.UserMapper;
import icu.qihangduan.dachuang_server.pojo.User;
import icu.qihangduan.dachuang_server.service.UserService;
import icu.qihangduan.dachuang_server.utils.MD5Utils;
import icu.qihangduan.dachuang_server.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



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

    @Override
    public User getUserInfo(UserDto userDto) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username", userDto.getUsername())
                .eq("password", MD5Utils.code(userDto.getPassword()));
        return userMapper.selectOne(wrapper);
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
        System.out.println("before insert：" + user);
        insertUser(user);
        //查找user，查看插入成功与否
        user = getUserInfo(userDto);
        System.out.println("after insert： user" + user + "\n userdto: " + userDto);
        if(user != null){
            BeanUtil.copyProperties(user, userDto, true);
            //得到token
            String token = TokenUtil.genToken(user.getId().toString(), user.getPassword());
            userDto.setToken(token);
            System.out.println("token: " + userDto);
            return userDto;
        }
        throw new ServiceException(Constants.CODE_600, "注册失败");
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
}
