package icu.qihangduan.dachuang_server.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;
import lombok.Data;
import java.io.*;


/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/28 14:59
 * Description: 阿里云OSS工具类（测试2）
 */
/**
 * public static void main(String[] args) throws Exception {
 *         // Endpoint以华东1（杭州）为例，其它Region请按实际情况填写。
 *         String endpoint = "https://oss-cn-hangzhou.aliyuncs.com";
 *         // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
 *         String accessKeyId = "yourAccessKeyId";
 *         String accessKeySecret = "yourAccessKeySecret";
 *         // 填写Bucket名称，例如examplebucket。
 *         String bucketName = "examplebucket";
 *         // 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中不能包含Bucket名称。
 *         String objectName = "exampledir/exampleobject.txt";
 *
 *         // 创建OSSClient实例。
 *         OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
 *
 *         try {
 *             String content = "Hello OSS";
 *             ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(content.getBytes()));
 *         } catch (OSSException oe) {
 *             System.out.println("Caught an OSSException, which means your request made it to OSS, "
 *                     + "but was rejected with an error response for some reason.");
 *             System.out.println("Error Message:" + oe.getErrorMessage());
 *             System.out.println("Error Code:" + oe.getErrorCode());
 *             System.out.println("Request ID:" + oe.getRequestId());
 *             System.out.println("Host ID:" + oe.getHostId());
 *         } catch (ClientException ce) {
 *             System.out.println("Caught an ClientException, which means the client encountered "
 *                     + "a serious internal problem while trying to communicate with OSS, "
 *                     + "such as not being able to access the network.");
 *             System.out.println("Error Message:" + ce.getMessage());
 *         } finally {
 *             if (ossClient != null) {
 *                 ossClient.shutdown();
 *             }
 *         }
 *     }
* */
@Data
public class AliYunOSSUtils {
    private static final String endpoint = "https://oss-cn-hangzhou.aliyuncs.com";
    private static final String accessKeyId  = "LTAI5tLPLhwaf83aMMXjXzyT";
    private static final String accessKeySecret = "LgwCMMrsY7Tl9TkMA5J7UsIbpbnFyT";
    private static final String bucketName = "rider-dachaung";
    /*上传文件url前缀*/
    private static final String fileURL = "https://" + bucketName + ".oss-cn-hangzhou.aliyuncs.com/";

    private static OSS getClient(){
        return new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
    }

    public static String putUserFile(InputStream inputStream, String fileName, String userName) throws Exception{
        OSS client = getClient();

        String objectName = "dachaung/User/" + userName + "/";
        //重命名文件并将后缀赋给objectName
        objectName = objectName + System.currentTimeMillis() + fileName.substring(fileName.lastIndexOf("."));

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, objectName, inputStream);
        // 设置该属性可以返回response。如果不设置，则返回的response为空。
        putObjectRequest.setProcess("true");
        // 创建PutObject请求。
        PutObjectResult result = client.putObject(putObjectRequest);
        // 如果上传成功，则返回200。
        System.out.println(result.getResponse().getStatusCode());

        String filePath = fileURL + objectName;

        client.shutdown();

        return filePath;
    }

    /*测试接口*/
    public static void main(String[] args) throws Exception{
        System.out.println(putUserFile(new FileInputStream("src/main/resources/static/IMG_20230118_161445.jpg"),
                "IMG_20230118_161445.jpg", "admin"));
    }
}
