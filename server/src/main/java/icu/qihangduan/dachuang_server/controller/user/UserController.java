package icu.qihangduan.dachuang_server.controller.user;

import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import com.wf.captcha.SpecCaptcha;
import com.wf.captcha.base.Captcha;
import icu.qihangduan.dachuang_server.common.Constants;
import icu.qihangduan.dachuang_server.common.Resp;
import icu.qihangduan.dachuang_server.controller.user.dto.CaptchaDto;
import icu.qihangduan.dachuang_server.controller.user.dto.UserDto;
import icu.qihangduan.dachuang_server.exception.ServiceException;
import icu.qihangduan.dachuang_server.pojo.User;
import icu.qihangduan.dachuang_server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.concurrent.TimeUnit;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/7 14:47
 * Description:
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private StringRedisTemplate redisTemplate;


    @PostMapping(value = "/login")
    public Resp login(@RequestBody UserDto userDto){
        //验证验证码
        if(!verifyCaptcha(userDto.getCodeID(), userDto.getCode())){
            return Resp.success(Constants.CODE_202);
        }
        //有异常globalExceptionHandler会处理
        UserDto rel = userService.login(userDto);
        return Resp.success(rel);
    }

    @PostMapping(value = "/register")
    public Resp register(@RequestBody UserDto userDto){
        if(!verifyCaptcha(userDto.getCodeID(), userDto.getCode())){
            return Resp.success(Constants.CODE_202);
        }
        UserDto rel = userService.register(userDto);
        return Resp.success(rel);
    }


    /**
     * 验证码
     */
    @RequestMapping(value = "/code",method = RequestMethod.GET)
    public Resp getCaptcha(){
        // 三个参数分别为宽、高、位数
        SpecCaptcha captcha = new SpecCaptcha(100, 40, 4);

        // 设置类型 数字和字母混合
        captcha.setCharType(Captcha.TYPE_ONLY_UPPER);

        CaptchaDto code =  new CaptchaDto();
        //给验证码生成一个id
        String uuid = "code-key-" + IdUtil.simpleUUID();
        code.setImg(captcha.toBase64());
        code.setUuid(uuid);

        //将生成的验证码存入redis缓存，有效时间CodeTimeOut
        redisTemplate.opsForValue().set(uuid, captcha.text(), Constants.CodeTimeOut_5m, TimeUnit.SECONDS);

        return Resp.success(code);
    }

    /**
     * 验证验证码
     * @return
     */
    private boolean verifyCaptcha(String id, String code){
        String redisCache = redisTemplate.opsForValue().get(id);
        if(redisCache == null){
            return false;
        }
        return code.equals(redisCache);
    }


    /**
     * 查询账号是否存在
     * @param username
     * @return
     */
    @GetMapping(value = "/queryUser")
    public Resp queryUserName(
            @RequestParam(value = "username")String username
    ){
        User temp = userService.queryUserName(username);
        if(temp == null){
            return Resp.success();
        }
        return Resp.success("201");
    }
}
