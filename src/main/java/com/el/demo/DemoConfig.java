package com.el.demo;

import com.el.core.auth.ApiRuleProvider;
import com.el.core.auth.AuthInfoProvider;
import com.el.core.auth.ShiroConfiguration;
import com.el.core.cache.CacheConfig;
import com.el.core.jdbc.JdbcConfig;
import com.el.core.redis.RedisConfig;
import com.el.core.redis.cache.RedisCacheConfig;
import com.el.core.scheduling.TaskPlanManager;
import com.el.core.storage.StorageConfig;
import com.el.core.web.WebAppConfig;
import com.el.demo.auth.DemoApiRuleProvider;
import com.el.demo.auth.DemoAuthInfoProvider;
import com.el.demo.scheduling.DemoTaskPlanManager;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * @author neo.pan
 * @since 17/4/20
 */
@Profile("demo-cfg")
@Slf4j
@Configuration
@EnableScheduling
@Import({
        WebAppConfig.class,
        JdbcConfig.class,
        RedisConfig.class,
        RedisCacheConfig.class,
        CacheConfig.class,
        StorageConfig.class,
        ShiroConfiguration.class,
        DemoMessagingConfig.class,
})
@MapperScan("com.el.demo.mapper")
public class DemoConfig {

    @Bean
    public AuthInfoProvider authInfoProvider() {
        log.info("[DEMO-BEAN] authInfoProvider");
        return new DemoAuthInfoProvider();
    }

    @Bean
    public ApiRuleProvider apiRuleProvider() {
        log.info("[DEMO-BEAN] apiRuleProvider");
        return new DemoApiRuleProvider();
    }

    @Bean
    public TaskPlanManager taskPlanManager() {
        log.info("[DEMO-BEAN] taskPlanProvider");
        return new DemoTaskPlanManager();
    }

}
