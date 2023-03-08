package icu.qihangduan.dachuang_server.controller.user.dto;


import icu.qihangduan.dachuang_server.pojo.Comment;
import icu.qihangduan.dachuang_server.pojo.Favorites;
import icu.qihangduan.dachuang_server.pojo.Likes;
import icu.qihangduan.dachuang_server.pojo.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 20:29
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDto {
    private Long id;
    private String title;
    private String content;
    private Date createdAt;
    private Date updatedAt;
    private int isPublished;
    private String avatar;
    private Long userId;
    private Integer likesNum;
    private Integer commentsNum;
    private Integer favoritesNum;

    List<Tag> tags;
    List<Likes> likes;
    List<Favorites> favorites;
    List<Comment> comments;
}
