package icu.qihangduan.dachuang_server.interceptor;

import cn.hutool.core.util.StrUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import icu.qihangduan.dachuang_server.common.Constants;
import icu.qihangduan.dachuang_server.exception.ServiceException;
import icu.qihangduan.dachuang_server.pojo.User;
import icu.qihangduan.dachuang_server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 10:14
 * Description:
 */
public class JWTinterceptor implements HandlerInterceptor {

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String token = request.getHeader("token");
        if(StrUtil.isBlank(token)){
            token = request.getParameter("token");
        }
        //认证
        if(StrUtil.isBlank(token)){
            throw new ServiceException(Constants.CODE_401,"无TOKEN，请登录");
        }
        //解析token验证
        String userID;
        try{
            userID = JWT.decode(token).getAudience().get(0);
        }catch (JWTDecodeException e){
            throw new ServiceException(Constants.CODE_401,"token验证失败，请重新登录");
        }
        //根据token中的id查询数据库
        // 根据token中的userid查询数据库

        User user = userService.getUserByID(Long.parseLong(userID));

        if (user == null) {
            throw new ServiceException(Constants.CODE_401, "用户不存在，请重新登录");
        }
        // 用户密码加签验证 token
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getPassword())).build();
        try {
            jwtVerifier.verify(token); // 验证token
        } catch (JWTVerificationException e) {
            throw new ServiceException(Constants.CODE_401, "token验证失败，请重新登录");
        }
        return true;
    }
}
