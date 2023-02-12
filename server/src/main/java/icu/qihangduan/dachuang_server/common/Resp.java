package icu.qihangduan.dachuang_server.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/7 17:05
 * Description: 请求响应体
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resp {
    private String code;
    private String msg;
    private Object data;

    public static Resp success() {
        return new Resp(Constants.CODE_200, "", null);
    }

    public static Resp success(Object data) {
        return new Resp(Constants.CODE_200, "", data);
    }
    public static Resp success(Object data, String msg) {
        return new Resp(Constants.CODE_200, msg, data);
    }

    public static Resp success(String code) {
        return new Resp(code, "", "");
    }

    public static Resp error(String code, String msg) {
        return new Resp(code, msg, null);
    }

    public static Resp error() {
        return new Resp(Constants.CODE_500, "系统错误", null);
    }
}
