package icu.qihangduan.dachuang_server.utils;

import com.vladsch.flexmark.html.HtmlRenderer;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/3/6 23:57
 * Description:
 */
public class MarkdownUtil {
    public static String genHTML(String document){
       /* MutableDataSet options = new MutableDataSet();*/

        // uncomment to set optional extensions
        //options.set(Parser.EXTENSIONS, Arrays.asList(TablesExtension.create(), StrikethroughExtension.create()));

        // uncomment to convert soft-breaks to hard breaks
        //options.set(HtmlRenderer.SOFT_BREAK, "<br />\n");

        Parser parser = Parser.builder().build();
        HtmlRenderer renderer = HtmlRenderer.builder().build();

        // You can re-use parser and renderer instances
        /*Node document = parser.parse("This is *Sparta*");*/

        return renderer.render(parser.parse(document));
    }
}
