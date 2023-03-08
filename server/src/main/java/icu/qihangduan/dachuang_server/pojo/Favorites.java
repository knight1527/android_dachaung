package icu.qihangduan.dachuang_server.pojo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 15:42
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Favorites {
    private Long id;
    private Long articleId;
    private Long userId;
    @TableField(fill = FieldFill.INSERT)
    private Date createdAt;
}
