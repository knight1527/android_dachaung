package icu.qihangduan.dachuang_server.service;

import icu.qihangduan.dachuang_server.common.Resp;
import icu.qihangduan.dachuang_server.controller.user.dto.UserDto;
import icu.qihangduan.dachuang_server.pojo.User;
import org.springframework.stereotype.Service;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/7 14:27
 * Description:
 */

public interface UserService {
    User getUserInfo(UserDto userDto);

    boolean insertUser(User user);

    UserDto login(UserDto userDto);

    UserDto register(UserDto userDto);

    User queryUserName(String username);
}
