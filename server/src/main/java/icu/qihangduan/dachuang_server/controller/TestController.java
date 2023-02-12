package icu.qihangduan.dachuang_server.controller;

import icu.qihangduan.dachuang_server.common.Resp;
import icu.qihangduan.dachuang_server.controller.user.dto.UserDto;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/10 16:04
 * Description:
 */
@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping(value = "/api")
    public Resp testApi(){
        return Resp.error("204", "请登录");
    }
}
