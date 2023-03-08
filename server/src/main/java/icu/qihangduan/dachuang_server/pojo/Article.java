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
 * Date: 2023/3/6 15:04
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    private Long id;
    private String title;
    private String content;
    @TableField(fill = FieldFill.INSERT)
    private Date createdAt;
    @TableField(fill = FieldFill.UPDATE)
    private Date updatedAt;
    private int isPublished;
    private String avatar;
    private Long userId;
    private Integer likesNum;
    private Integer commentsNum;
    private Integer favoritesNum;

    private transient User user;
    private transient List<Tag> tags;
    private transient List<Likes> likes;
    private transient List<Favorites> favorites;
    private transient List<Comment> comments;
}
