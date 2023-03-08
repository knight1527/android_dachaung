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
 * Date: 2023/3/6 15:36
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    private Long id;
    private String title;
    private Long typeId;
    private Date registerAt;
    private Date registerEnd;
    private Date progressAt;
    private Date progressEnd;
    @TableField(fill = FieldFill.INSERT)
    private Date createdAt;
    @TableField(fill = FieldFill.UPDATE)
    private Date updatedAt;
    private int isPublished;
    private String avatar;
    private Long userId;
    private String company;
    private Long levelId;
    private String description;
    private Integer commentsNum;
    private Integer favoritesNum;

    private transient User user;
    private transient Type type;
    private transient Level level;
    private transient String status;
    private transient List<FavoritesEvent> favorites;
    private transient List<CommentEvent> comments;
}
