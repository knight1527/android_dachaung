package icu.qihangduan.dachuang_server.controller.user;

import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSON;
import com.wf.captcha.SpecCaptcha;
import com.wf.captcha.base.Captcha;
import icu.qihangduan.dachuang_server.common.Constants;
import icu.qihangduan.dachuang_server.common.Resp;
import icu.qihangduan.dachuang_server.controller.user.dto.CaptchaDto;
import icu.qihangduan.dachuang_server.controller.user.dto.UserDto;
import icu.qihangduan.dachuang_server.exception.ServiceException;
import icu.qihangduan.dachuang_server.pojo.Article;
import icu.qihangduan.dachuang_server.pojo.Event;
import icu.qihangduan.dachuang_server.pojo.User;
import icu.qihangduan.dachuang_server.service.ArticleService;
import icu.qihangduan.dachuang_server.service.EventService;
import icu.qihangduan.dachuang_server.service.UserService;
import icu.qihangduan.dachuang_server.service.UtilService;
import icu.qihangduan.dachuang_server.utils.OtherUtils;
import icu.qihangduan.dachuang_server.utils.TokenUtil;
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
import java.util.List;
import java.util.Objects;
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

    @Autowired
    private UtilService utilService;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private EventService eventService;


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

    /**
     * 获取当前用户详情
     * @return
     */
    @PostMapping(value = "/self")
    public Resp getSelf(){
        Long userId = Objects.requireNonNull(TokenUtil.getCurrentUser()).getId();
        User user = userService.getUserByID(userId);
        user.setArticles(OtherUtils.fillContent(user.getArticles(), articleService));
        user.setEvents(OtherUtils.fillContent(user.getEvents(), eventService));
        return Resp.success(user);
    }
    /**
     * 获取当前用户较详情
     * @return
     */
    @GetMapping(value = "/selfInfo")
    public Resp getSelfInfo(){
        Long userId = Objects.requireNonNull(TokenUtil.getCurrentUser()).getId();
        return Resp.success(userService.getUserInfoById(userId));
    }

    /**
     * 获取当前用户详情
     * @return
     */
    @GetMapping(value = "/selfById")
    public Resp getUserById(
            @RequestParam(value = "userId") Long userId
    ){
        User user = userService.getUserByID(userId);
        user.setArticles(OtherUtils.fillContent(user.getArticles(), articleService));
        user.setEvents(OtherUtils.fillContent(user.getEvents(), eventService));
        return Resp.success(user);
    }

    /**
     * 关注
     * @return
     */
    @PostMapping(value = "/focus")
    public Resp focusUser(
            @RequestParam(value = "userId")Long userId
    ){
        User currentUser = TokenUtil.getCurrentUser();
        User user = userService.getUserByID(userId);
        utilService.focus(currentUser, user);
        return Resp.success();
    }
    /**
     * 取消关注
     * @return
     */
    @PostMapping(value = "/cancelFocus")
    public Resp cancelFocusUser(
            @RequestParam(value = "userId")Long userId
    ){
        User currentUser = TokenUtil.getCurrentUser();
        User user = userService.getUserByID(userId);
        utilService.cancelFocus(currentUser, user);
        return Resp.success();
    }

    @PostMapping(value = "/update")
    public Resp updateCurrentUser(
        @RequestBody User user
    ){
        userService.updateCurrentUser(user);
        return Resp.success();
    }
}
