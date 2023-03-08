package icu.qihangduan.dachuang_server.controller;

import icu.qihangduan.dachuang_server.common.Resp;
import icu.qihangduan.dachuang_server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/7 0:16
 * Description:
 */
@RestController
@RequestMapping(value = "/event")
public class EventController {
    @Autowired
    EventService eventService;

    @GetMapping(value = "/index")
    public Resp getIndex(
            @RequestParam(value = "pageNum")int pageNum
    ){
        return Resp.success(eventService.getIndexEvents(pageNum));
    }
    @GetMapping(value = "detail")
    public Resp getEventDetails(
            @RequestParam(value = "eventId")Long eventId
    ){
        return Resp.success(eventService.getEventById(eventId));
    }
}
