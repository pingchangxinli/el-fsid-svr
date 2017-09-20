package com.el;

import com.el.core.auth.AuthController;
import com.el.core.util.SqlDialectMySQL;
import com.el.core.util.SqlUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.TypeExcludeFilter;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.web.WebApplicationInitializer;

import static org.springframework.context.annotation.FilterType.CUSTOM;

/**
 * 应用启动入口
 */
@Slf4j
@SpringBootApplication
public class App extends SpringBootServletInitializer implements WebApplicationInitializer {

    static {
        SqlUtil.SQL_DIALECT = new SqlDialectMySQL();
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(App.class);
    }

    public static void main(String[] args) {
        log.info("[APP] Application startup...");
        SpringApplication.run(App.class, args);
        log.info("[APP] Application started.");
    }

}
