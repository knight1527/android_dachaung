package icu.qihangduan.dachuang_server.pojo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 15:32
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private Long id;
    private String content;
    private Long parentCommentId;
    @TableField(fill = FieldFill.INSERT)
    private Date createdAt;
    private Long articleId;
    private Long UserId;
    private Integer replyNum;

    private transient User user;
    private transient List<Comment> replyComments;
}
