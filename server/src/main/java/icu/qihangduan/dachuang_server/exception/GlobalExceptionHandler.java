package icu.qihangduan.dachuang_server.exception;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSSException;
import icu.qihangduan.dachuang_server.common.Resp;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileNotFoundException;

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

    /**
     * OSS异常
     * @param oe
     * @return
     */
    @ExceptionHandler(OSSException.class)
    @ResponseBody
    public void handle(OSSException oe){
        System.out.println(
                "==========================================OSS异常==================================================");
        System.out.println("Caught an OSSException, which means your request made it to OSS, but was rejected with an" +
                " error response for some reason.");
        System.out.println("Error Message:" + oe.getErrorMessage());
        System.out.println("Error Code:" + oe.getErrorCode());
        System.out.println("Request ID:" + oe.getRequestId());
        System.out.println("Host ID:" + oe.getHostId());
        System.out.println(
                "==================================================================================================");
    }

    /**
     * OSS异常
     * @param ce
     * @return
     */
    @ExceptionHandler(ClientException.class)
    @ResponseBody
    public void handle(ClientException ce){
        System.out.println(
                "==========================================OSS异常==================================================");
        System.out.println("Caught an ClientException, which means the client encountered "
                                    + "a serious internal problem while trying to communicate with OSS, "
                                    + "such as not being able to access the network.");
        System.out.println("Error Message:" + ce.getMessage());
        System.out.println(
                "==================================================================================================");
    }

    @ExceptionHandler(FileNotFoundException.class)
    @ResponseBody
    public void handle(FileNotFoundException se){
        System.out.println(
                "==========================================异常==================================================");
        System.out.println("FileNotFound");
        System.out.println(se.getMessage());
        System.out.println(
                "==================================================================================================");
    }
}
