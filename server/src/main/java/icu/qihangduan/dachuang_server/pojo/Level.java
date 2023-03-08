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
 * Date: 2023/3/7 15:22
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Level {
    private Long id;
    private String name;
    @TableField(fill = FieldFill.INSERT)
    private Date createdAt;
}
