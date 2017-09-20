package com.el.demo;

import com.el.core.messaging.EventMessageHandler;
import com.el.core.messaging.mailer.MailerConfig;
import com.el.core.messaging.pusher.WsPusherConfig;
import com.el.core.messaging.storer.MongoEventMessageStorer;
import com.el.core.mongo.MongoConfig;
import com.el.core.redis.RedisKeyspaceResolver;
import com.el.core.redis.pubsub.RedisPubSubConfig;
import com.el.demo.messaging.DemoMailAddressProvider;
import com.el.demo.messaging.DemoPostman;
import lombok.extern.slf4j.Slf4j;
import org.mongodb.morphia.Datastore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.Topic;

/**
 * @author neo.pan
 * @since 17/5/4
 */
@Slf4j
@Configuration
@Import({
        MongoConfig.class,
        MailerConfig.class,
        WsPusherConfig.class,
        RedisPubSubConfig.class,
})
public class DemoMessagingConfig {

    @Bean
    public Topic topic(RedisKeyspaceResolver keyspaceResolver) {
        log.info("[DEMO-MSG] topic");
        return new ChannelTopic(keyspaceResolver.queueSpace());
    }

    @Bean
    public DemoPostman postman(Topic topic) {
        log.info("[DEMO-MSG] postman");
        return new DemoPostman(topic);
    }

    @Bean
    public EventMessageHandler storer(Datastore mongoDataStore) {
        log.info("[DEMO-MSG] storer");
        return new MongoEventMessageStorer(mongoDataStore);
    }

    @Bean
    public DemoMailAddressProvider mailAddressProvider() {
        log.debug("[DEMO-MSG] mailAddressProvider");
        return new DemoMailAddressProvider();
    }

}
