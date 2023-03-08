package icu.qihangduan.dachuang_server.pojo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/7 14:21
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;
    private String email;
    private String username;
    private String password;
    private String avatar;
    private String college;
    private String major;
    private String description;
    private String nickname;
    private String blog;

    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    private transient List<Article> articles;
    private transient List<Event> events;
    //关注数
    private transient int focusNum;
    //粉丝数
    private transient int focusedNum;
    private transient  List<User> focus;
    private transient List<User> focused;
    //收藏的文章和赛事
    private transient List<Article> favoritesArticles;
    private transient List<Event> favoritesEvents;
}
