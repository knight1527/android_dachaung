package icu.qihangduan.dachuang_server.pojo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 15:44
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoritesEvent {
    private Long id;
    private Long eventId;
    private Long userId;
    @TableField(fill = FieldFill.INSERT)
    private Date createdAt;
}
