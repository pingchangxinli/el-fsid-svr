package com.el.demo.messaging;

import com.el.core.messaging.domain.EventMessage;
import com.el.core.messaging.domain.EventType;
import com.el.core.util.TimeUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

/**
 * @author neo.pan
 * @since 17/5/4
 */
@Data
@ToString(exclude = "content")
@EqualsAndHashCode(of = "id")
@Entity(value = "event_msgs", noClassnameStored = true)
public class DemoEventMessage implements EventMessage {

    @Id
    private ObjectId id;

    /**
     * 事件类型
     */
    private EventType type;

    /**
     * 事件源
     */
    @Embedded
    private DemoEventSource source;

    /**
     * 事件通知对象
     */
    @Embedded
    private DemoEventTarget target;

    /**
     * 发信内容
     */
    private String content;

    /**
     * 事件产生时间
     */
    long createTime = TimeUtil.now();

}
