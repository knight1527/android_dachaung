package icu.qihangduan.dachuang_server.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 22:14
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleTag {
    private Long id;
    private Long articleId;
    private Long tagId;
}
