package icu.qihangduan.dachuang_server.config;


import icu.qihangduan.dachuang_server.interceptor.JWTinterceptor;
import icu.qihangduan.dachuang_server.interceptor.LogInInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author duanqihang
 * Created with IntelliJ IDEA.
 * User: suse_QiHang
 * Date: 2023/2/11 16:40
 * Description:
 */
@Configuration
public class WebConfig extends WebMvcConfigurationSupport {
    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/user/login", "/user/register","/user/code","/user/queryUser", "/**/export",
                        "/**/import",
                        "/file/**");
        super.addInterceptors(registry);
    }

    @Bean
    public JWTinterceptor jwtInterceptor() {
        return new JWTinterceptor();
    }
}
