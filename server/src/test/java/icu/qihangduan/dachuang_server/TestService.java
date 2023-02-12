package icu.qihangduan.dachuang_server;

import cn.hutool.core.util.IdUtil;
import com.auth0.jwt.JWT;
import com.wf.captcha.SpecCaptcha;
import com.wf.captcha.base.Captcha;
import icu.qihangduan.dachuang_server.service.UserService;
import icu.qihangduan.dachuang_server.service.impl.UserServiceImpl;
import icu.qihangduan.dachuang_server.utils.MD5Utils;
import icu.qihangduan.dachuang_server.utils.TokenUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpSession;
import java.util.concurrent.TimeUnit;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/10 17:59
 * Description:
 */
@SpringBootTest
public class TestService {
    @Autowired
    UserService userService;

    @Autowired
    private StringRedisTemplate redisTemplate;


    @Test
    public void testQueryUser(){
        System.out.println(userService.queryUserName("asdmasd"));
    }

    @Test
    public void other(){
        System.out.println(JWT.decode("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIiwiZXhwIjoxNjc2OTA3MDU5fQ" +
                ".fi-5iV2KJVMOFtW6j4InBoD-14Y51b3n1WU4NMqclgI").getAudience().get(0));
    }
}
