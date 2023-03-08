package icu.qihangduan.dachuang_server.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 23:33
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFocus {
    private Long id;
    private Long userId;
    private Long focusUserId;
}