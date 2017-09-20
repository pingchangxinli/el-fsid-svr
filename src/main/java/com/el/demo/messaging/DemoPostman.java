package com.el.demo.messaging;

import com.el.core.messaging.domain.EventMessage;
import com.el.core.messaging.domain.EventType;
import com.el.core.redis.pubsub.RedisPostman;
import org.springframework.data.redis.listener.Topic;

import java.util.List;

/**
 * @author neo.pan
 * @since 17/5/4
 */
public class DemoPostman extends RedisPostman<DemoEventUser> {

    private Topic topic;

    public DemoPostman(Topic topic) {
        this.topic = topic;
    }

    @Override
    protected String getTopic() {
        return topic.getTopic();
    }

    @Override
    protected EventMessage newMessage(
            EventType type, String message, DemoEventUser sender, List<DemoEventUser> targets) {
        DemoEventMessage msg = new DemoEventMessage();
        msg.setType(type);
        msg.setSource(DemoEventSource.of(sender));
        msg.setTarget(DemoEventTarget.of(targets));
        msg.setContent(message);
        return msg;
    }

}
