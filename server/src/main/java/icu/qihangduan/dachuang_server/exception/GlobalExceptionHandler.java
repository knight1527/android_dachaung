package icu.qihangduan.dachuang_server.exception;

import icu.qihangduan.dachuang_server.common.Resp;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 如果抛出的的是ServiceException，则调用该方法
     * @param se 业务异常
     * @return Result
     */
    @ExceptionHandler(ServiceException.class)
    @ResponseBody
    public Resp handle(ServiceException se){
        return Resp.error(se.getCode(), se.getMessage());
    }

}
