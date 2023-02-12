package icu.qihangduan.dachuang_server.common;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/7 17:03
 * Description:
 */
public class Constants {
    public static String CODE_200 = "200"; //成功
    public static String CODE_201 = "201"; //成功但账号已存在
    public static String CODE_202 = "202"; //成功但验证码不正确
    public static String CODE_401 = "401";  // 权限不足
    public static String CODE_400 = "400";  // 参数错误
    public static String CODE_500 = "500"; // 系统错误
    public static String CODE_600 = "600"; // 其他业务异常

    //验证码过期时间
    public static long CodeTimeOut = 60;
    public static long CodeTimeOut_5m = 300;
}
