package icu.qihangduan.dachuang_server.controller.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/11 21:05
 * Description:
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CaptchaDto {
    private String img;
    private String uuid;
}
